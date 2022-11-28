export default interface Property<T> {
  property: keyof T;
  isDescending: boolean;
}