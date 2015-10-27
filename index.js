/*
 * hue-find
 * https://github.com/jsfi/hue-discover
 *
 * Copyright (c) 2015 Martin Sachse
 * Licensed under the MIT license.
 */

'use strict';

const ssdp = require('peer-ssdp');
const uuid = require('node-uuid');
const got = require('got');

module.exports = function(options) {
    let start = +new Date();
    let configuration = Object.assign({
        timeout: 45000,
        devices: 1,
        description: '/description.xml',
        find: 'meethue.com'
    }, options);

    return new Promise(function(resolve, reject) {
        let peer = ssdp.createPeer();
        let usn = uuid.v4();
        let location = uuid.v4();
        let server = 'hue-discover-' + usn.split('-').pop();
        let devices = [];
        let timer;

        peer.on('ready', onReady)
        .on('notify', onNotify)
        .start();

        function onReady() {
            peer.alive({
                NT: 'upnp:rootdevice',
                USN: 'uuid:' + uuid + '::upnp:rootdevice',
                LOCATION: 'http://{{networkInterfaceAddress}}/upnp/devices/' + location + configuration.description,
                SERVER: server
            });

            peer.search({
                ST: 'upnp:rootdevice'
            });

            timer = setTimeout(notFound, configuration.timeout);
        }

        function onNotify(headers, device) {
            got(device.address + configuration.description)
            .then(description => {
                if (~description.body.indexOf(configuration.find)) {
                    devices.push(device.address);

                    if (devices.length == configuration.devices) {
                        resolve(devices);
                        close();
                    }
                }
            }).catch(e => {
                if (e.code != 'ECONNREFUSED') {
                    reject(e);
                }
            });
        }

        function close() {
            console.log((+new Date() - start) / 1000);
            clearTimeout(timer);
            peer.byebye({
                NT: 'upnp:rootdevice',
                USN: 'uuid:' + uuid + '::upnp:rootdevice',
                LOCATION: 'http://{{networkInterfaceAddress}}/upnp/devices/' + location + configuration.description,
                SERVER: server
            }, function () {
                peer.close();
            });
        }

        function notFound() {
            resolve(devices);
            close();
        }
    });
};