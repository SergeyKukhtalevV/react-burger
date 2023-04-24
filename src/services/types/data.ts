export type TElement = {
  element: JSX.Element;
}

export type TModal = {
  active: boolean;
  setActive: (arg: boolean) => void;
}

export type TFCWithModal = {
  isActive: boolean;
  setModalActive: (arg: boolean) => void
}
