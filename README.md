# hue-discover

> Discover your Philips Hue base station

## Install

This module requires node `>=4.0.0`

```
$ git clone git@github.com:jsfi/hue-discover.git
```

## Usage

```js
require('./hue-discover')(configuration);
```

## Example

```js
let bridges = require('./hue-discover')();
// returns array with IP-addresses of available hue bridges
```

## Configuration

```js
{
    timeout: 45000,
    bridges: 1,
    description: '/description.xml',
    find: 'meethue.com'
}
```

### Timeout

default: `45000` (45s)

This option configures the maximal amount of time the function will search the network for bridges.

### Bridges

default: `1`

This option configures the quantity of bridges you expect in the network. If the quantity is found the function will return before the timeout ends.

### Description

default: `'/description.xml'`

This option configures the relative path of the description file, that will be searched.

### Find

default: `'meethue.com'`

This option configures the string that is searched inside the description. If it is found, the IP will be added to the result array.

## Returned Value

```
[ IP1, ... ]
```

The function returns an array with all the bridges that were found in the network during the time configured in the timeout. If the number of found bridges matches the configured number, the function will return early.
