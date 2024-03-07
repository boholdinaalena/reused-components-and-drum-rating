import { b as buildAssetsURL } from '../../handlers/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import '../../nitro/node-server.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import 'ipx';
import 'devalue';
import 'vue/server-renderer';
import '@unhead/ssr';
import 'vue';
import 'unhead';
import '@unhead/shared';

const main = "@font-face{color:#fff;font-family:Inter;font-weight:400;src:url(" + buildAssetsURL("Inter-Regular.DYjygwQm.ttf") + ') format("truetype")}:root{--green:#3dff4d;--red:#ff2600}body{background:#010423;color:#fff;font-family:Inter,sans-serif;margin:0;padding:0}';

const entryStyles_CDrPetTw = [main];

export { entryStyles_CDrPetTw as default };
//# sourceMappingURL=entry-styles.CDrPetTw.mjs.map
