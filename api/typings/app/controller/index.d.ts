// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportTiku from '../../../app/controller/tiku';

declare module 'egg' {
  interface IController {
    tiku: ExportTiku;
  }
}
