export const componentName = (element: { name: string }) => `app-${element.name.toLowerCase()}`;

export function singleton(ObjectClass: any, Instance: any) {
  if (ObjectClass.singleton) {
    throw new Error(`Singleton instance of ${ObjectClass.name} already exists, use ${ObjectClass.name}.getInstance()`);
  }
  ObjectClass.singleton = Instance;
  return ObjectClass.singleton;
}
