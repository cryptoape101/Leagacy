import React from 'react';
import { Eth as EthIcon } from '@leagacy/assets/icons/eth';
import { Tether as TetherIcon } from '@leagacy/assets/icons/tether';
import { Usdc as UsdcIcon } from '@leagacy/assets/icons/usdc';

/**
 * @file displayFormat.js
 * This helper file is used to format display data.
 * Currently, it includes a function to generate a list of years
 * based on the current year and the sport provided.
 */

/**
 * Generates a display formatted string for the year
 * If the year is a single digit, it returns the year as a string
 * If the year is a two digit array, it returns the years as a range
 * 
 * @param {Object} year - The year to format
 * @param {boolean} shortFormat - Whether to format the year in short format
 * @param {string} delimiter - The delimiter to use for the range
 * @returns String
 */
export const formatYear = ({year, shortFormat = false, delimeter: delimiter = '-'}) => {
  if (!year) {
    console.warn('Year is not set');
    return '';
  } else if (year.length === 1) {
    return formatYearShortLong(year[0].toString(), shortFormat);
  } else if (year.length === 2) {
    let sortedYear = [...year]; // Create a copy of the year array
    sortedYear.sort((a, b) => a - b); // Sort the copy
    return `${formatYearShortLong(sortedYear[0], shortFormat)}${delimiter}${formatYearShortLong(sortedYear[1], shortFormat)}`;
  }
  return '';
}

/**
 * Formats a year in either short or long format.
 * If the flag is true, it returns the last two digits of the year.
 * If the flag is false, it returns the full year.
 * 
 * @param {number} year - The year to format.
 * @param {boolean} shortFormat - Whether to format the year in short format.
 * @returns {string} - The formatted year.
 */
export const formatYearShortLong = (year, shortFormat = false) => {
  if (shortFormat) {
    return String(year).slice(-2);
  } else {
    return String(year);
  }
};

export const getCurrencyIcon = (iconName) => {
  switch (iconName) {
    case 'ETH':
      return <EthIcon />;
    case 'USDC':
      return <UsdcIcon />;
    case 'USDT':
      return <TetherIcon />;
    default:
      return null;
  }
};

export const formatCurrency = (fee, currency) => {
  if (!fee || !currency) {
    console.warn('Fee or currency is not set');
    return '';
  }

  if (currency.iconName) {
    const icon = getCurrencyIcon(currency.iconName);
    if (icon) {
      return <>{fee} {icon}</>;
    }
  }

  return `${fee} $${currency.symbol}`;
}