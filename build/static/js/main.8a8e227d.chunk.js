(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{15:function(e,t,n){e.exports=n(38)},37:function(e,t,n){},38:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),u=n(14),c=n.n(u),o=n(4),l=n(2),i=n(3),s=n.n(i),m="http://localhost:3001/api/persons",d=function(){return s.a.get(m).then((function(e){return e.data}))},f=function(e){return s.a.post(m,e).then((function(e){return e.data}))},b=function(e,t){return s.a.put("".concat(m,"/").concat(e),t).then((function(e){return e.data}))},h=function(e){return s.a.delete("".concat(m,"/").concat(e)).then((function(e){return e.data}))},p=(n(37),function(e){var t=e.message,n=e.type;return null===t?null:"sucess"===n?r.a.createElement("div",{className:"sucess"},t):"error"===n?r.a.createElement("div",{className:"error"},t):void 0}),E=function(e){var t=e.persons,n=e.deletePerson;return r.a.createElement("div",null,t.map((function(e){return r.a.createElement("p",{key:e.id},e.name," ",e.number," ",r.a.createElement("button",{onClick:function(){return n(e)}},"delete"))})))},v=function(e){return r.a.createElement("div",null,r.a.createElement("div",null," filer shown with ",r.a.createElement("input",{value:e.filterText,onChange:e.handleFilter})))},w=function(e){return r.a.createElement("form",{onSubmit:e.addPerson},r.a.createElement("div",null," name: ",r.a.createElement("input",{value:e.newName,onChange:function(t){return e.setNewName(t.target.value)}})," "),r.a.createElement("div",null,"number: ",r.a.createElement("input",{value:e.newNumber,onChange:function(t){return e.setNewNumber(t.target.value)}})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add")))},j=function(){var e=Object(a.useState)([]),t=Object(l.a)(e,2),n=t[0],u=t[1],c=Object(a.useState)(""),i=Object(l.a)(c,2),s=i[0],m=i[1],j=Object(a.useState)(""),O=Object(l.a)(j,2),N=O[0],g=O[1],k=Object(a.useState)(""),y=Object(l.a)(k,2),S=y[0],C=y[1],P=Object(a.useState)([]),T=Object(l.a)(P,2),x=T[0],A=T[1],D=Object(a.useState)(null),F=Object(l.a)(D,2),I=F[0],J=F[1],L=Object(a.useState)("sucess"),B=Object(l.a)(L,2),q=B[0],z=B[1];Object(a.useEffect)((function(){console.log("effect"),d().then((function(e){u(e)}))}),[]);var G=function(e){window.confirm("Delete ".concat(e.name))&&h(e.id).then(u(n.filter((function(t){return t.id!==e.id})))).then(C(""))};return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(p,{message:I,type:q}),r.a.createElement(v,{filterText:S,handleFilter:function(e){C(e.target.value),A(n.filter((function(t){return t.name.toLowerCase().includes(e.target.value.toLowerCase())})))}}),r.a.createElement("h2",null,"Add a new "),r.a.createElement(w,{addPerson:function(e){e.preventDefault();var t=n.some((function(e){return e.name===s})),a=n.some((function(e){return e.number===N}));if(t||a){if(a)alert("".concat(s," is already added to phonebook")),m(""),g("");else if(window.confirm("".concat(s," is already added to phonebook, replace the old number with a new one?"))){var r=n.find((function(e){return e.name===s})),c=Object(o.a)(Object(o.a)({},r),{},{number:N});b(r.id,c).then((function(e){u(n.map((function(t){return t.id!==r.id?t:e})))})).catch((function(e){z("error"),J("Information of ".concat(s," has already been removed from serer")),setTimeout((function(){J(null)}),2e3)}))}}else f({name:s,number:N}).then((function(e){u(n.concat(e)),J("Added ".concat(e.name)),z("sucess"),setTimeout((function(){J(null)}),2e3),m(""),g("")}))},setNewName:m,setNewNumber:g},"  newNumber=",N," newName=",s),r.a.createElement("h2",null,"Numbers"),S.length>0?r.a.createElement(E,{deletePerson:G,persons:x}):r.a.createElement(E,{deletePerson:G,persons:n}))};c.a.render(r.a.createElement(j,null),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.8a8e227d.chunk.js.map