import{E as e,N as s,d as a,R as n,o as i,c as l,k as t,w as o,Z as d,a as r,P as c,Y as f,n as u,z as p,_ as k,a1 as m}from"./index.f1ca6476.js";const y=e({type:{type:String,values:["primary","success","warning","info","danger","default"],default:"default"},underline:{type:Boolean,default:!0},disabled:{type:Boolean,default:!1},href:{type:String,default:""},icon:{type:s,default:""}}),b=["href"];const v=m(k(a({name:"ElLink",props:y,emits:{click:e=>e instanceof MouseEvent},setup(e,{emit:s}){const a=e,k=n("link");function m(e){a.disabled||s("click",e)}return(e,s)=>(i(),l("a",{class:u([r(k).b(),r(k).m(e.type),r(k).is("disabled",e.disabled),r(k).is("underline",e.underline&&!e.disabled)]),href:e.disabled||!e.href?void 0:e.href,onClick:m},[e.icon?(i(),t(r(c),{key:0},{default:o((()=>[(i(),t(d(e.icon)))])),_:1})):f("v-if",!0),e.$slots.default?(i(),l("span",{key:1,class:u(r(k).e("inner"))},[p(e.$slots,"default")],2)):f("v-if",!0),e.$slots.icon?p(e.$slots,"icon",{key:2}):f("v-if",!0)],10,b))}}),[["__file","/home/runner/work/element-plus/element-plus/packages/components/link/src/link.vue"]]));export{v as E};
