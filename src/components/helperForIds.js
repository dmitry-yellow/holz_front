export const getBigSizeId = (selectedTypeId) => {
  if (selectedTypeId === 4224) {
    return 80530;
  } else if(selectedTypeId === 80602) {
    return 80605;
  } else {
    return 80693;
  }
};

export const getSmallSizeId = (selectedTypeId) => {
  if (selectedTypeId === 4224) {
    return 80504;
  } else if(selectedTypeId === 80602) {
    return 80604;
  } else {
    return 80692;
  }
};

export const getNoColorId = (selectedTypeId) => {
  if (selectedTypeId === 4224) {
    return 80533;
  } else if(selectedTypeId === 80602) {
    return 80613;
  } else {
    return 80701;
  }
};

export const getSkimmerId = (selectedTypeId) => {
  if (selectedTypeId === 4224) {
    return 80574;
  } else if(selectedTypeId === 80602) {
    return 80667;
  } else {
    return 80753;
  }
};

export const getTubeExtensionId = (selectedTypeId) => {
  if (selectedTypeId === 4224) {
    return 80527;
  } else if(selectedTypeId === 80602) {
    return 80679;
  } else {
    return 80767;
  }
};

export const getSandFilterId = (selectedTypeId) => {
  if (selectedTypeId === 4224) {
    return 80591;
  } else if(selectedTypeId === 80602) {
    return 80668;
  } else {
    return 80757;
  }
};

export const getPreparationForSandFilterId = (selectedTypeId) => {
  if (selectedTypeId === 4224) {
    return 80575;
  } else if(selectedTypeId === 80602){
    return 80666;
  } else {
    return 80754;
  }
};

export const getAddAccNoPriceId = (selectedTypeId) => {
  if (selectedTypeId === 4224) {
    return 80523;
  } else if(selectedTypeId === 80602) {
    return 80669;
  } else {
    return 80752;
  }
};

export const getNoLedId = (selectedTypeId) => {
  if (selectedTypeId === 4224) {
    return 80517;
  } else if(selectedTypeId === 80602) {
    return 80656;
  } else {
    return 80743;
  }
};

export const getNoMassageFuncId = (selectedTypeId) => {
  if (selectedTypeId === 4224) {
    return 80515;
  } else if(selectedTypeId === 80602) {
    return 80653;
  } else {
    return 80736;
  }
};

export const getNoCoverId = (selectedTypeId) => {
  if (selectedTypeId === 4224) {
    return 80580;
  } else if(selectedTypeId === 80602) {
    return 80639;
  } else {
    return 80721;
  }
};

export const getNoMetalStrapsId = (selectedTypeId) => {
  if (selectedTypeId === 4224) {
    return 80513;
  } else if(selectedTypeId === 80602) {
    return 80646;
  } else {
    return 80733;
  }
};

export const getWoodenBoxId = (selectedTypeId) => {
  if (selectedTypeId === 4224) {
    return 80576;
  } else if(selectedTypeId === 80602) {
    return 80665;
  } else {
    return 80755;
  }
};

export const getHeatingOvenExtId = (data) => {
  const hoArr = Object.keys(data);
  if(hoArr?.length >= 1){
    return hoArr[0]
  }
};