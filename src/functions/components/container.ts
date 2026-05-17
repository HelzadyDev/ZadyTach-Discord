import { isDefined } from '@zadytach/core';
import {
  ContainerBuilder,
  resolveColor,
  ComponentType,
  ColorResolvable,
  ContainerComponentBuilder,
  APIComponentInContainer,
  SectionBuilder,
  Message
} from 'discord.js';
import { createComponents } from '#functions';
import {
  isMessage,
  isActionRowBuilder,
  isSectionBuilder,
  isButtonBuilder,
  isTextDisplayBuilder,
  isMediaGalleryBuilder,
  isFileBuilder,
  isSeparatorBuilder
} from '#guards';

type ContainerData = {
  from?: ContainerBuilder | Message | { message: Message };
  fromIndex?: number;
  accentColor?: ColorResolvable | null;
  components?: unknown[];
  array?: boolean;
};

class ContainerPlusBuilder extends ContainerBuilder {
  constructor(data?: ContainerData) {
    const extractData = (message: Message) =>
      message.components
        .filter((v) => v.type === ComponentType.Container)
        .at(data?.fromIndex ?? 0)
        ?.toJSON() ?? {};

    const constructorData: Record<string, unknown> =
      isDefined(data?.from)
        ? "message" in data!.from!
          ? extractData((data!.from as { message: Message }).message)
          : isMessage(data!.from as any)
          ? extractData(data!.from as Message)
          : (data!.from as ContainerBuilder).toJSON()
        : {};

    if (isDefined(data?.accentColor)) {
      constructorData.accent_color = resolveColor(data!.accentColor as ColorResolvable);
    }

    super(constructorData as any);

    if (isDefined(data?.components) && data!.components!.length >= 1) {
      this.spliceComponents(
        0,
        0,
        ...(createComponents(data!.components) as (ContainerComponentBuilder | APIComponentInContainer)[])
      );
    }
  }

  /**
   * Sets the accent color of the container.
   *
   * If a color is provided, it resolves and sets the accent color accordingly.
   * If no color or `null` is provided, it clears the accent color.
   *
   * @param color - The color to set as the accent color, or `null` to clear it.
   * @returns The current instance for chaining.
   *
   * @example
   * container.setColor("#ff0000"); // Sets the accent color to red.
   * container.setColor(null);      // Clears the accent color.
   */

  setColor(color: ColorResolvable | null) {
    return isDefined(color)
      ? this.setAccentColor(resolveColor(color!))
      : this.setAccentColor();
  }

/**
   * Replaces or removes a component at the specified index in the container.
   *
   * If `data` is provided, it replaces the component at the given index with the new component(s).
   * If `null` is provided, it removes the component at that index.
   *
   * @param index - The index of the component to replace or remove.
   * @param data - The new component data to set, or `null` to remove the component.
   * @returns The current instance for chaining.
   *
   * @example
   * container.setComponent(0, new ButtonBuilder({ label: "Click" }));
   * container.setComponent(1, null); // Removes the component at index 1.
   */

  setComponent(index: number, data: unknown) {
    return this._spliceComponents(index, 1, data);
  }

  insertComponent(argA: number | unknown, argB?: unknown) {
    if (typeof argA === "number") {
      return this._spliceComponents(argA, 0, argB);
    }
    return this._spliceComponents(this.components.length, 0, argA);
  }

  _spliceComponents(index: number, deleteCount: number, data?: unknown) {
    const args: [number, number, ...(ContainerComponentBuilder | APIComponentInContainer)[]] = [index, deleteCount];
    if (isDefined(data)) {
      args.push(...(createComponents(data) as (ContainerComponentBuilder | APIComponentInContainer)[]));
    }
    return this.spliceComponents(...args);
  }

  componentAt(index: number, type?: ComponentType) {
    return isDefined(type)
      ? this.components.filter((builder) => builder.data.type === type).at(index)
      : this.components.at(index);
  }

  get buttonComponents() {
    return this.components
      .filter((comp): comp is ContainerComponentBuilder =>
        isActionRowBuilder(comp as any, "buttons") || isSectionBuilder(comp as any)
      )
      .flatMap((comp) => {
        if (isSectionBuilder(comp as any)) {
          const section = comp as unknown as SectionBuilder;
          if (!section.accessory || !isButtonBuilder(section.accessory as any)) return [];
          return [section.accessory];
        }
        return (comp as any).components;
      });
  }

  get sectionComponents() {
    return this.components.filter((comp) => isSectionBuilder(comp as any));
  }

  get selectMenuComponents() {
    return this.components
      .filter((comp): comp is ContainerComponentBuilder => isActionRowBuilder(comp as any, "selects"))
      .flatMap((comp) => (comp as any).components);
  }

  get textDisplayComponents() {
    return this.components.filter((comp) => isTextDisplayBuilder(comp as any));
  }

  get actionRowComponents() {
    return this.components.filter(
      (row) => isActionRowBuilder(row as any, "buttons") || isActionRowBuilder(row as any, "selects")
    );
  }

  get mediaGalleryComponents() {
    return this.components.filter((comp) => isMediaGalleryBuilder(comp as any));
  }

  get fileComponents() {
    return this.components.filter((comp) => isFileBuilder(comp as any));
  }

  get separatorComponents() {
    return this.components.filter((comp) => isSeparatorBuilder(comp as any));
  }
}

function createContainer(data?: ContainerData | ColorResolvable, ...items: unknown[]) {
  const isContainerData = (value: unknown): value is ContainerData =>
    typeof value === "object" && isDefined(value) && !Array.isArray(value);

  if (isContainerData(data)) {
    const { array, from } = data;
    if (array) {
      if (isMessage(from as any)) {
        return (from as Message).components
          .filter((c) => c.type === ComponentType.Container)
          .map((component) => new ContainerPlusBuilder({ from: component as any }));
      }
      return [new ContainerPlusBuilder(data)];
    }
    return new ContainerPlusBuilder(data);
  }

  return new ContainerPlusBuilder({
    accentColor: data as ColorResolvable,
    components: items.flat()
  });
}

export { ContainerPlusBuilder, createContainer };