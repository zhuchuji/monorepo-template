import { Size, Color, ButtonType, DisabledColorType } from './typings';

export const DisabledColorMap: Record<DisabledColorType, string> = {
  light: '#fbfbfb',
  dark: '#d3dbde',
};

export const ColorMap: Record<Color, string> = {
  default: '#F8F8F8',
  primary: '#FD5330',
  secondary: '#FD5330',
  inherit: 'inherit',
};

export const SizeMap: Record<Size, Size> = {
  small: 'small',
  medium: 'medium',
  large: 'large',
};

export const FontSizeMap: Record<Size, string> = {
  small: '14px',
  medium: '16px',
  large: '18px',
};

export const ButtonTypeMap: Record<ButtonType, ButtonType> = {
  contained: 'contained',
  outlined: 'outlined',
  text: 'text',
};

const BorderRadiusSizeMap: Record<Size, string> = {
  small: '16px',
  medium: '24px',
  large: '32px',
};

const ButtonActiveColorMap: Record<Color, string> = {
  default: '#fffff',
  primary: '#E08A06',
  secondary: '#E08A06',
  inherit: 'inherit',
};

const OutlineButtonActiveColorMap: Record<Color, string> = {
  default: '#ffffff',
  primary: '#FEF0DA',
  secondary: '#FEF0DA',
  inherit: 'inherit',
};

const ModalSizeMap: Record<Size, string> = {
  small: '500px',
  medium: '800px',
  large: '1200px',
};

export interface Theme {
  color: typeof ColorMap;
  borderRadius: string;
  fontSize: typeof FontSizeMap;

  button: {
    color: typeof ColorMap;
    activeColor: typeof ButtonActiveColorMap;
    outlineActiveColor: typeof OutlineButtonActiveColorMap;
    padding: Record<Size, string>;
    borderRadius: typeof BorderRadiusSizeMap;
    disabledColor: typeof DisabledColorMap;
    loadingSize: Record<Size, string>;
  };

  input: {
    padding: Record<Size, string>;
    activeColor: string;
    disabledColor: typeof DisabledColorMap;
  };

  modal: {
    size: typeof ModalSizeMap;
  };
}

const theme: Theme = {
  color: ColorMap,
  borderRadius: '4px',
  fontSize: FontSizeMap,

  button: {
    color: ColorMap,
    activeColor: ButtonActiveColorMap,
    outlineActiveColor: OutlineButtonActiveColorMap,
    padding: {
      small: '4px 16px',
      medium: '6px 22px',
      large: '8px 28px',
    },
    borderRadius: BorderRadiusSizeMap,
    disabledColor: DisabledColorMap,
    loadingSize: {
      small: '16px',
      medium: '16px',
      large: '16px',
    },
  },

  input: {
    padding: {
      small: '6px 10px',
      medium: '10px 16px',
      large: '14px 22px',
    },
    activeColor: ColorMap.primary,
    disabledColor: DisabledColorMap,
  },

  modal: {
    size: ModalSizeMap,
  },
};

export default theme;
