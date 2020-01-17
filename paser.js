const parsers = [{ name: 'json', regExp: /^json\./, parseValue: (value) => JSON.parse(value) }];

function parseValue({ map, rawKey, rawValue, parser }) {
  try {
    const parsedKey = rawKey.replace(parser.regExp, '');
    map[parsedKey] = parser.parseValue(rawValue);
  } catch (error) {
    throw new Error(
      [
        `Error happen during parsing value with "${rawKey}" by parser "${parser.name}".`,
        typeof rawValue === 'string' ? `Value: "${rawValue}"` : undefined,
        error.message,
      ]
        .filter(Boolean)
        .join('\n'),
    );
  }
}

export default function parseMapDataForm(map) {
  const parsedMap = {};

  Object.keys(map).forEach( => {
    let isParsed = false;
    parsers.forEach((parser) => {
      if (parser.regExp.test(key)) {
        parseValue({ map: parsedMap, rawKey: key, rawValue: map[key], parser });
        isParsed = true;
      }
    });

    if (!isParsed) {
      parsedMap[key] = map[key];
    }
  });

  return parsedMap;
}