import{E as e,F as t,d as s,R as a,H as r,o as i,c as o,n as l,a as n,z as d,Y as c,a0 as p,_ as u,a1 as v}from"./index.f1ca6476.js";const f=v(u(s({name:"ElDivider",props:e({direction:{type:String,values:["horizontal","vertical"],default:"horizontal"},contentPosition:{type:String,values:["left","center","right"],default:"center"},borderStyle:{type:t(String),default:"solid"}}),setup(e){const t=e,s=a("divider"),u=r((()=>s.cssVar({"border-style":t.borderStyle})));return(e,t)=>(i(),o("div",{class:l([n(s).b(),n(s).m(e.direction)]),style:p(n(u)),role:"separator"},[e.$slots.default&&"vertical"!==e.direction?(i(),o("div",{key:0,class:l([n(s).e("text"),n(s).is(e.contentPosition)])},[d(e.$slots,"default")],2)):c("v-if",!0)],6))}}),[["__file","/home/runner/work/element-plus/element-plus/packages/components/divider/src/divider.vue"]]));export{f as E};
