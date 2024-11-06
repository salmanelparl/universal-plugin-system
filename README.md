# Universal Plugin System

Universal Plugin System adalah kerangka kerja yang memungkinkan penambahan atau penggantian fitur secara dinamis melalui penggunaan plugin. Plugin ini dapat berupa fungsi atau modul yang memperluas atau memodifikasi perilaku framework.

## Instalasi

```bash
npm install universal-plugin-system
```

#### Eksekusi Plugin

```js
import framework from 'universal-plugin-system';

framework.use((fw) => {
    fw.run = () => console.log('Plugin dijalankan!');
});
framework.run(); // Output: Plugin dijalankan!
```

#### Rangkaian Plugin dengan Urutan Eksekusi

```js
framework.use((fw) => {
    fw.plugins = [
        { name: 'Logger', run: () => console.log('Plugin Logger') },
        { name: 'Analytics', run: () => console.log('Plugin Analytics') },
    ];
    fw.runAll = () => fw.plugins.forEach((plugin) => plugin.run());
});
framework.runAll();
// Output:
// Plugin Logger
// Plugin Analytics
```

#### Middleware Berantai

```js
framework.use((fw) => {
    fw.middleware = [];
    fw.useMiddleware = (fn) => fw.middleware.push(fn);
    fw.execute = (context) => {
        let index = 0;
        const next = () => {
            if (index < fw.middleware.length) {
                fw.middleware[index++](context, next);
            }
        };
        next();
    };
});
framework.useMiddleware((ctx, next) => {
    console.log('Langkah 1', ctx);
    next();
});
framework.useMiddleware((ctx, next) => {
    console.log('Langkah 2', ctx);
    next();
});
framework.execute('Data konteks');
// Output:
// Langkah 1 Data konteks
// Langkah 2 Data konteks
```

#### Dependency Injection

```js
framework.use((fw) => {
    fw.services = {};
    fw.registerService = (name, service) => {
        fw.services[name] = service;
    };
    fw.getService = (name) => fw.services[name];
});
framework.registerService('api', { fetch: () => 'Data diambil dari API' });
console.log(framework.getService('api').fetch()); // Output: Data diambil dari API
```

#### Event Handling

```js
framework.use((fw) => {
    fw.events = {};
    fw.on = (event, handler) => {
        if (!fw.events[event]) fw.events[event] = [];
        fw.events[event].push(handler);
    };
    fw.emit = (event, data) => {
        (fw.events[event] || []).forEach((handler) => handler(data));
    };
});
framework.on('userLogin', (user) => console.log(`${user} masuk`));
framework.emit('userLogin', 'Alice');
// Output: Alice masuk
```

#### Konfigurasi Dinamis

```js
framework.use((fw) => {
    fw.config = {};
    fw.setConfig = (key, value) => {
        fw.config[key] = value;
    };
    fw.getConfig = (key) => fw.config[key];
});
framework.setConfig('apiEndpoint', 'https://api.example.com');
console.log(framework.getConfig('apiEndpoint')); // Output: https://api.example.com
```

## Lisensi

[MIT](LICENSE)
