export function isSupported(option: any) {
  // return supportedOptions.includes( option );
  return /^\d(.\d+)?$/gm.test(String(option));
}

export function normalizeOptions(configuredOptions: any[]) {
  return configuredOptions.map(optionDefinition).filter((option) => !!option);
}

function optionDefinition(option: any) {
  if (typeof option === 'object') {
    return option;
  }

  if (option === 'default') {
    return {
      model: undefined,
      title: 'Default',
    };
  }

  const sizePreset = parseFloat(option);

  if (isNaN(sizePreset)) {
    return;
  }

  return generatePixelPreset(sizePreset);
}

function generatePixelPreset(size: number) {
  const sizeName = String(size);

  return {
    title: sizeName,
    model: size,
    view: {
      name: 'span',
      styles: {
        'line-height': sizeName,
      },
      priority: 5,
    },
  };
}
