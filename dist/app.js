#!/usr/bin/env node
"use strict";var G=Object.create;var T=Object.defineProperty;var $=Object.getOwnPropertyDescriptor;var z=Object.getOwnPropertyNames;var A=Object.getPrototypeOf,V=Object.prototype.hasOwnProperty;var B=(r,t,e,o)=>{if(t&&typeof t=="object"||typeof t=="function")for(let i of z(t))!V.call(r,i)&&i!==e&&T(r,i,{get:()=>t[i],enumerable:!(o=$(t,i))||o.enumerable});return r};var u=(r,t,e)=>(e=r!=null?G(A(r)):{},B(t||!r||!r.__esModule?T(e,"default",{value:r,enumerable:!0}):e,r));var J=require("commander");var g=class{constructor({prompt:t,logger:e,spinner:o,launcher:i,utils:n}){this.Prompt=t,this.Logger=e,this.Spinner=o,this.Launcher=i,this.CommonUtil=n.CommonUtil,this.FileUtil=n.FileUtil}async invoke(){try{await this.prepare(),await this.execute(),await this.finalize()}catch(t){let e=t;this.Logger.errorD(e),await this.rollback()}}};var N=u(require("moment")),c=class r{constructor(t){let e={error:0,info:1,warn:2,debug:3,trace:4};this.logLevel=t?e[t]:2}static getInstance(t){return r.instance?this.instance.debug("Get Logger Instance"):(r.instance=new r(t),this.instance.debug("New Logger Instance"),this.instance.debug(`Level: ${t}`)),r.instance}formatMessage(t,e,o){return`${(0,N.default)().format("YYYY.MM.DD HH:mm:ss")} | ${t}${e}\x1B[0m | ${o}`}debug(t){this.logLevel>=3&&(typeof t=="object"&&(t=JSON.stringify(t,null,2)),console.log(this.formatMessage("\x1B[36m","DEBUG",t)))}info(t){this.logLevel>=1&&console.info(this.formatMessage("\x1B[32m","INFO",t))}warn(t){this.logLevel>=2&&console.warn(this.formatMessage("\x1B[33m","WARN",t))}error(t){this.logLevel>=0&&console.error(this.formatMessage("\x1B[31m","ERROR",t))}errorD(t){this.logLevel>=4&&console.error(this.formatMessage("\x1B[31m","ERROR_D",`{
  type: '${t.title}'
  reason: '${t.context}'
}`))}space(){console.log()}logo(){console.log(`
\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800
\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2880\u28E0\u28E4\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800
\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2880\u28FE\u28FF\u28FF\u280F\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800
\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u28A0\u28FF\u28FF\u28FF\u284F\u2840\u28C0\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800
\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u287F\u2803\u2800\u28C0\u28C0\u2840\u2800\u2800\u2800\u2800\u2800\u2880\u28C0\u2840\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800
\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2880\u28F8\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28F6\u28FE\u28FF\u28FF\u28D7\u2800\u2800\u2880\u28E0\u28F6\u28FF\u28FF\u2847\u2800\u2800\u2880\u28FE\u28FE\u28FE\u28FE\u28FE\u28FE\u2802\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800
\u2800\u2800\u2800\u2800\u2800\u2800\u2880\u285E\u2801\u28FD\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28F7\u28F6\u28FE\u28FF\u28FF\u28FF\u283F\u280F\u2801\u2800\u2800\u28B8\u28FF\u28FF\u2809\u2809\u2809\u2809\u28A0\u28E4\u28E4\u2800\u2800\u28E4\u28E4\u2844\u2800\u28E0\u28E4\u28C4\u28E0\u28E4\u28A0\u28E4\u28E4\u2800\u2800\u28E4\u28E4\u2844\u2800\u2800\u2800\u2800
\u2800\u2800\u2800\u2800\u2800\u2880\u28FE\u2805\u2828\u28FF\u28FF\u28BF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u284F\u2808\u2818\u28FB\u28FF\u2809\u2808\u2800\u2800\u2800\u2800\u2800\u2800\u28FD\u28FF\u28FF\u28FE\u28FE\u284E\u2800\u28FC\u28FF\u28DF\u2800\u2890\u28FF\u28FF\u2803\u2880\u28FF\u28FF\u283F\u281B\u2813\u2898\u28FF\u28FF\u2800\u28B0\u28FF\u285F\u2800\u2800\u2800\u2800\u2800
\u2800\u2800\u2800\u2800\u2800\u2818\u28FF\u28E7\u28C0\u2819\u2821\u28FF\u28FF\u28FF\u284F\u28FF\u28FF\u287F\u2801\u2800\u2880\u28FD\u28FF\u28E7\u28C0\u2800\u2800\u2800\u2800\u2800\u28B0\u28FF\u28FF\u2801\u2801\u2801\u2801\u2880\u28FF\u28FF\u2847\u2800\u28FC\u28FF\u28DF\u2800\u28B0\u28FF\u28FF\u2801\u2800\u2800\u2800\u28FF\u28FF\u28E0\u28FF\u285F\u2800\u2800\u2800\u2800\u2800\u2800
\u2800\u2800\u2800\u2800\u2800\u2800\u2819\u28BF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28E7\u28CD\u28C9\u28C1\u28C0\u28E4\u28FE\u28FF\u287F\u283F\u280B\u2800\u2800\u2800\u2800\u2800\u28FE\u28FF\u286F\u2800\u2800\u2800\u2800\u2818\u28FF\u28FF\u287F\u287F\u28BB\u28FF\u28DF\u2800\u28FD\u28FF\u284F\u2800\u2800\u2800\u2800\u28FB\u28FF\u28FF\u280F\u2800\u2800\u2800\u2800\u2800\u2800\u2800
\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2808\u2809\u281B\u281B\u281F\u283F\u283F\u283B\u281F\u283F\u283B\u283B\u281B\u280B\u2801\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2801\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u28C0\u28F4\u28FE\u287F\u2803\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800
\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2839\u281B\u2809\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800
\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800
\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800
`)}};var l=require("fs"),k=require("path");var a=class{constructor(t,e,o){this.logger=c.getInstance(),this.title=`${t}Exception`,this.message=e,this.context=o}};var q="NoData",f=class extends a{constructor(t){super(q,t)}};var Y="OperationFail",p=class extends a{constructor(t,e){super(Y,t,e),this.logger.error(`${this.convertMessage(t)} Faild.`)}convertMessage(t){return{projectBuild:"Project Build",createDirectory:"Create Project Directory"}[t]}};var m=class r{constructor(){}static makePath(t,e){return(0,k.join)(t,e)}static async checkExist(t){return(0,l.existsSync)(t)}static async createDirectory(t,e,o){try{let i=(0,k.join)(t,e);return(0,l.mkdirSync)(i,{recursive:o!=null&&o.recursive?o.recursive:!1}),await this.checkExist(i),i}catch(i){throw new p("createDirectory",i)}}static async createFile(t,e,o){let i=(0,k.join)(t,e);return(0,l.writeFileSync)(i,o),this.checkExist(i)}static async createStructure(t,e){for(let o in t){let i=t[o];typeof i=="string"&&await this.createFile(e,`${o}.${i}`,""),typeof i=="object"&&(await this.createDirectory(e,o),await r.createStructure(i,this.makePath(e,o)))}}};var d=class{constructor(){}static validateRequireFields(t,e){e.forEach(o=>{if(t[o]===void 0)throw new p(o);return!0})}};var s=class{constructor(t){this.logger=c.getInstance(),this.FileUtil=m,this.projectInfo=t,this.sWorkDir=process.cwd()}setWorkDir(t){this.sWorkDir=t}};var D={name:"moduleName",version:"1.0.0",description:"JavaScritp Project setup from fury",main:"src/index.js",scripts:{dev:"node src/index.js"},keywords:[],author:"",license:"ISC",dependencies:{}};var O={name:"moduleName",version:"1.0.0",description:"TypeScript Project setup from fury",main:"dist/index.js",scripts:{build:"npx tsc",dev:"ts-node src/index.ts"},keywords:[],author:"",license:"ISC",devDependencies:{"@types/node":"^20.12.7","ts-node":"^10.9.2",typescript:"^5.4.5"}};var C={compilerOptions:{target:"ES2020",module:"commonjs",outDir:"./dist",rootDir:"./src",esModuleInterop:!0,declaration:!0}};var L={default:{src:{index:"js",utils:{projectUtil:"js"}}},typescript:{src:{index:"ts",utils:{projectUtil:"ts"}}}};var h=class extends s{constructor(t){super(t)}async setup(){let t=await this.FileUtil.createDirectory(this.sWorkDir,this.projectInfo.projectName),e=this.projectInfo.useTypescript?O:D,o=this.projectInfo.useTypescript?L.typescript:L.default;e.name=this.projectInfo.projectName,await this.FileUtil.createFile(t,"package.json",JSON.stringify(e,null,2)),this.projectInfo.useTypescript&&await this.FileUtil.createFile(t,"tsconfig.json",JSON.stringify(C,null,2)),await this.FileUtil.createStructure(o,t),this.setWorkDir(t)}getWorkDir(){return this.sWorkDir}getFactory(){var t;switch((t=this.projectInfo)==null?void 0:t.frameworkType){case"react":return new y(this.projectInfo);case"vue":return new x(this.projectInfo);case"express":return new v(this.projectInfo);default:return this}}};var y=class extends s{async setup(){}getWorkDir(){return""}};var x=class extends s{async setup(){}getWorkDir(){return""}};var v=class extends s{async setup(){}getWorkDir(){return""}};var S=[{type:"text",name:"projectName",message:"Enter the project name:",initial:"demo"},{type:"confirm",name:"useTypescript",message:"Use TypeScript?",initial:!1},{type:"confirm",name:"useFramework",message:"Use Framework?",initial:!1},{type:"confirm",name:"useGit",message:"Use Git?",initial:!1},{type:"confirm",name:"usePrettier",message:"Use Prettier?",initial:!1},{type:"confirm",name:"useEslint",message:"Use ESLint?",initial:!1}],U=[{type:"select",name:"frameworkType",message:"Select a framework:",choices:[{title:"\x1B[34mReact\x1B[0m",value:"react"},{title:"\x1B[32mVue\x1B[0m",value:"vue"}]}],E=[{type:"text",name:"remoteUrl",message:"Enter the remote repo URL:",validate:r=>{let t=new RegExp(/https:\/\/github\.com\/[a-zA-Z0-9]+\/[a-zA-Z0-9]/);return r===""?!1:!!t.test(r)}}];var b=class extends g{constructor(){super(...arguments);this.projectInfo={};this.sWorkDir=""}async prepare(){let e=await this.Prompt.call(S);Object.assign(this.projectInfo,e);let o=S.map(i=>String(i.name));if(this.CommonUtil.validateRequireFields(this.projectInfo,o),this.projectInfo.useFramework){let i=await this.Prompt.call(U);this.CommonUtil.validateRequireFields(i,U.map(n=>String(n.name))),Object.assign(this.projectInfo,i)}if(this.projectInfo.useGit){let i=await this.Prompt.call(E);this.CommonUtil.validateRequireFields(i,E.map(n=>String(n.name))),Object.assign(this.projectInfo,i)}this.Logger.space()}async execute(){let e=new h(this.projectInfo).getFactory();await e.setup(),this.sWorkDir=e.getWorkDir()}async finalize(){let e=this.Spinner.get();if(this.projectInfo.useGit){let i=e.start("Setup Git...");await this.FileUtil.createFile(this.sWorkDir,".gitignore","node_modules");try{await this.Launcher.run("git",["init"],this.sWorkDir),await this.Launcher.run("git",["remote","add","origin",this.projectInfo.remoteUrl],this.sWorkDir),i.succeed("Setup Git")}catch(n){i.fail("Setup Git"),this.Logger.error(n.message)}}if(this.projectInfo.usePrettier){let i=e.start("Setup Prettier...");await this.FileUtil.createFile(this.sWorkDir,".prettierrc.yaml",""),i.succeed("Setup Prettier")}let o=e.start("Install...");await this.Launcher.run("pnpm",["install"],this.sWorkDir),o.succeed("Install")}async rollback(){}};var j=class{constructor(){}static async call(t){let{default:e}=await import("update-notifier"),o=e({pkg:t,updateCheckInterval:0});o.update&&o.notify({message:`New Version! \x1B[31m{currentVersion}\x1B[0m \u2192 \x1B[32m{latestVersion}\x1B[0m.
 \x1B[35mChangelog:\x1B[0m https://github.com/jujoycode/fury-tool

 Run "{updateCommand}" to update.`})}};var R=u(require("prompts"));var P=class{constructor(){this.prompt=R.default}async call(t){return await this.prompt(t)}};var w=class r{constructor(){this.ora=null;import("ora").then(t=>{this.ora=t.default({spinner:"bouncingBar"})})}static getInstance(){return r.instance||(r.instance=new r),r.instance}get(){if(!this.ora)throw new f("Spinner instance is not initialized yet.");return this.ora}};var I=class r{constructor(){this.execa=null;import("execa").then(t=>{this.execa=t})}static getInstance(){return r.instance||(r.instance=new r),r.instance}async run(t,e,o){if(!this.execa)throw new Error("Launcher instance is not initialized yet.");let{stdout:i}=await this.execa.execa(t,e,{cwd:o});return i}};var M="trace";var F={name:"fury-tool",version:"0.0.1",description:"CLI tool for JavaScript developers",main:"dist/app.js",bin:{fury:"./dist/app.js"},scripts:{build:"rm -rf dist && npx tsc && rm -rf types && node ./scripts/build.mjs",dev:"node ./dist/app.js"},keywords:[],author:"",license:"ISC",devDependencies:{"@types/node":"^20.12.7","@types/prompts":"^2.4.9","@types/update-notifier":"^6.0.8","ts-node":"^10.9.2",typescript:"^5.4.5"},dependencies:{commander:"^12.1.0",esbuild:"^0.22.0",execa:"^9.3.0",moment:"^2.30.1",ora:"^8.0.1",prompts:"^2.4.2","update-notifier":"^7.0.0"}};var W=class{constructor(){this.program=new J.Command,this.prompt=new P,j.call(F),this.spinner=w.getInstance(),this.launcher=I.getInstance(),this.logger=c.getInstance(M),this.configureCommands()}async configureCommands(){this.program.name(F.name).option("no option","Start create project").option("-g, --git","Start git management",!1).version(F.version).description(F.description).action(async t=>{let e=this.getCommand(t);e&&await e.invoke()})}getCommand(t){let e={prompt:this.prompt,logger:this.logger,spinner:this.spinner,launcher:this.launcher,utils:{CommonUtil:d,FileUtil:m}};switch(!0){case t.git:return;default:return new b(e)}}run(){this.logger.logo(),this.program.parse(process.argv)}};new W().run();
