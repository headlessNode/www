<!--

@license Apache-2.0

Copyright (c) 2019 The Stdlib Authors.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

-->

# Documentation Server

> Create an HTTP server for serving API documentation.

<section class="usage">

## Usage

```javascript
var httpServer = require( '@stdlib/_tools/docs/www/server' );
```

#### httpServer( \[options] )

Returns a function which creates an HTTP server for serving API documentation.

<!-- run-disable -->

```javascript
var opts = {
    'port': 7331,
    'address': '127.0.0.1'
};
var createServer = httpServer( opts );

function done( error, fastify ) {
    if ( error ) {
        throw error;
    }
    console.log( 'Success!' );
    fastify.server.close();
}

createServer( done );
```

The function accepts the following `options`:

-   **address**: server address. Default: `'127.0.0.1'`.
-   **hostname**: server hostname (e.g., `localhost` ).
-   **latest**: path to the "latest" documentation (e.g., this could simply be a `version`, such as `v0.0.90`, or an arbitrary (relative) path, such as `foo/bar/beep/boop`). When set to an empty string (as is the default), the server does **not** virtually map the version `latest` to a particular set of documentation resources. Default: `''`.
-   **logger**: `boolean` indicating whether to enable logging. Default: `false`.
-   **port**: server port. Default: `0` (i.e., randomly assigned).
-   **prefix**: URL path prefix used to create a virtual mount path for a static directory (e.g., `/docs/api/` to match the API documentation virtual mount path). Default: `'/'`.
-   **root**: root directory containing API documentation. May be either an absolute path or a path relative to the current working directory. This directory will be mounted onto the virtual path `/docs/api/`. Default: current working directory.
-   **static**: directory from which to serve static documentation assets and files. May be either an absolute path or a path relative to the current working directory. When set to an empty string (as is the default), the server does **not** serve static assets. Default: `''`.
-   **template**: application shell template. Default: `''`.
-   **trustProxy**: `boolean` indicating whether to trust `X-forwarded-by` headers when the server is sitting behind a proxy. Default: `false`.

An application shell template should include a `{{ FRAGMENT }}` parameter into which fragments are injected.

<!-- run-disable -->

```javascript
var template = [
    '<html>',
    '<body>',
    '{{ FRAGMENT }}',
    '</body>',
    '</html>'
];

var opts = {
    'port': 7331,
    'address': '127.0.0.1',
    'template': template.join( '\n' )
};

var createServer = httpServer( opts );
```

* * *

### Routes

<a name="docs-api-get"></a>

#### GET /docs/api

Returns the main documentation web application and is equivalent to returning the landing page for the latest documentation version.

##### Response: 200 (text/html)

The response body will be an HTML string containing a documentation landing page.

##### Examples

From the command-line,

<!-- run-disable -->

```bash
$ curl 'http://127.0.0.1:<port>/docs/api'
```

* * *

<a name="docs-api-version-get"></a>

#### GET /docs/api/:version

Returns a documentation landing page for a specified `version`.

##### Response: 200 (text/html)

The response body will be an HTML string containing a documentation landing page.

##### Examples

From the command-line,

<!-- run-disable -->

```bash
$ curl 'http://127.0.0.1:<port>/docs/api/v0.0.90'
```

* * *

<a name="docs-api-version-pkg-get"></a>

#### GET /docs/api/:version/\*?fragment=<true|false>

Returns package documentation for a specified `version`.

##### Response: 200 (text/html)

The response body will be an HTML string containing the package documentation either as an HTML fragment or as a standalone web page.

##### Examples

From the command-line, to return a standalone web page,

<!-- run-disable -->

```bash
$ curl 'http://127.0.0.1:<port>/docs/api/v0.0.90/@stdlib/math/base/special/'
```

To return an HTML fragment,

<!-- run-disable -->

```bash
$ curl 'http://127.0.0.1:<port>/docs/api/v0.0.90/@stdlib/math/base/special/?fragment=true'
```

* * *

<a name="ping-get"></a>

#### GET /ping

Pings the server application.

##### Response: 200 (text/plain)

The response body will be

```text
pong
```

##### Examples

From the command-line,

<!-- run-disable -->

```bash
$ curl 'http://127.0.0.1:<port>/ping'
```

* * *

<a name="status-get"></a>

#### GET /status

Returns the server application's status.

##### Response: 200 (text/plain)

The response body will be

```text
OK
```

##### Examples

From the command-line,

<!-- run-disable -->

```bash
$ curl 'http://127.0.0.1:<port>/status'
```

</section>

<!-- /.usage -->

* * *

<section class="notes">

## Notes

-   The server expects the `root` directory to have the following structure:

    ```text
    /<version>
      |- <pkg>
      |- <pkg>
      |- <pkg>
      |- ...
    /<version>
      |- <pkg>
      |- <pkg>
      |- <pkg>
      |- ...
    index.html
    ```

    where

    -   `<version>` corresponds to a documentation version (e.g., `v0.0.90`)
    -   `<pkg>` corresponds to a package path (e.g., `@stdlib/math/base/special/sin`)
    -   the root `index.html` contains the main application for viewing API documentation

</section>

<!-- /.notes -->

* * *

<section class="examples">

## Examples

<!-- run-disable -->

<!-- eslint no-undef: "error" -->

```javascript
var join = require( 'path' ).join;
var httpServer = require( '@stdlib/_tools/docs/www/server' );

var opts = {
    'port': 3000,
    'address': '127.0.0.1',
    'logger': true,
    'root': join( __dirname, 'examples', 'fixtures' ),
    'template': '<html><body>Fragment: {{ FRAGMENT }}</body></html>'
};

var createServer = httpServer( opts );

function done( error, fastify ) {
    if ( error ) {
        console.error( error.message );
        return;
    }
    console.log( 'Success!' );
    console.log( fastify.server.address() );
    fastify.server.close();
}

createServer( done );
```

</section>

<!-- /.examples -->

* * *

<section class="cli">

## CLI

<section class="usage">

### Usage

```text
Usage: stdlib-www-doc-server [options]

Options:

  -h,    --help                      Print this message.
  -V,    --version                   Print the package version.
         --address address           Server address. Default: 127.0.0.1.
         --hostname hostname         Server hostname.
         --latest path               Path to the "latest" documentation.
         --logger                    Enable logging.
         --port port                 Server port. Default: 0.
         --prefix prefix             Virtual mount path for static files.
         --root dir                  Root documentation directory.
         --static dir                Static file directory.
         --template filepath         Path to an application shell template.
         --trust_proxy               Trust X-forwarded-by headers.
```

</section>

<!-- /.usage -->

<section class="notes">

### Notes

-   A `template` file path may be either an absolute path or a path relative to the current working directory.

</section>

<!-- /.notes -->

<section class="examples">

### Examples

<!-- run-disable -->

```bash
$ stdlib-www-doc-server --logger
```

</section>

<!-- /.examples -->

</section>

<!-- /.cli -->

<section class="links">

</section>

<!-- /.links -->
