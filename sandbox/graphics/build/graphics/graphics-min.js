YUI.add("graphics",function(D){var C=function(E){this.initializer.apply(this,arguments);};C.prototype={initializer:function(E){this._dummy=this._createDummy();this._canvas=this._createGraphic();this._context=this._canvas.getContext("2d");this._initProps();},_reHex:/^#?([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})$/i,_2RGBA:function(F,E){E=(E!==undefined)?E:1;if(this._reHex.exec(F)){F="rgba("+[parseInt(RegExp.$1,16),parseInt(RegExp.$2,16),parseInt(RegExp.$3,16)].join(",")+","+E+")";}return F;},_createDummy:function(){var E=D.config.doc.createElement("div");E.style.height=0;E.style.width=0;E.style.overflow="hidden";D.config.doc.documentElement.appendChild(E);return E;},_createGraphic:function(E){var F=D.config.doc.createElement("canvas");F.width=600;F.height=600;return F;},_2RGB:function(E){this._dummy.style.background=E;return this._dummy.style.backgroundColor;},beginBitmapFill:function(G,E,F){return this;},beginFill:function(E,G){var F=this._context;F.beginPath();if(E){if(G){E=this._2RGBA(E,G);}else{E=this._2RGB(E);}this._fillColor=E;this._fillType="solid";}return this;},beginGradientFill:function(H,F,E,I,G){this._fillType=H;this._fillColors=F;this._fillRatios=I;this._fillRotation=G;this._context.beginPath();return this;},_trackSize:function(E,F){if(E>this._width){this._width=E;}if(F>this._height){this._height=E;}},_trackPos:function(E,F){if(E>this._x){this._x=E;}if(F>this._y){this._y=F;}},_initProps:function(){var E=this._canvas,F=this._context;F.fillStyle="rgba(0, 0, 0, 1)";F.lineWidth=1;F.lineJoin="miter";F.miterLimit=3;F.strokeStyle="rgba(0, 0, 0, 1)";this._width=0;this._height=0;this._x=0;this._y=0;this._fillType=null;this._stroke=null;},clear:function(){this._initProps();this._canvas.width=this._canvas.width;return this;},curveTo:function(G,F,E,H){this._context.quadraticCurveTo(G,F,E,H);return this;},drawCircle:function(F,K,E){var I=this._context,H=0*Math.PI/180,G=360*Math.PI/180,J=false;this._trackPos(F,K);this._trackSize(E*2,E*2);I.arc(F+E,K+E,E,H,G,J);return this;},drawEllipse:function(E,J,G,I,F,H){return this;},drawRect:function(E,I,F,H){this.moveTo(E,I).lineTo(E+F,I).lineTo(E+F,I+H).lineTo(E,I+H).lineTo(E,I);var G=this._context;this._trackPos(E,I);this._trackSize(F,H);return this;},drawRoundRect:function(E,K,G,I,H,J){var F=this._context;F.moveTo(E,K+J);F.lineTo(E,K+I-J);F.quadraticCurveTo(E,K+I,E+H,K+I);F.lineTo(E+G-H,K+I);F.quadraticCurveTo(E+G,K+I,E+G,K+I-J);F.lineTo(E+G,K+J);F.quadraticCurveTo(E+G,K,E+G-H,K);F.lineTo(E+H,K);F.quadraticCurveTo(E,K,E,K+J);this._trackPos(E,K);this._trackSize(G,I);return this;},_getFill:function(){var G=this._fillType,E=this._width,F=this._height,H;switch(G){case"linear":H=this._getLinearGradient(E,F,"fill");break;case"radial":H=this._getRadialGradient(E,F,"fill");break;case"solid":H=this._fillColor;break;}return H;},_getLinearGradient:function(S,M,O){var G="_"+O,F=this[G+"Colors"],L=this[G+"Ratios"],Q=this._x,P=this._y,T=this._context,E=this[G+"Rotation"],K,I,J,N,H,R;switch(E){case 45:R=T.createLinearGradient(Q+S,P+M,Q,P);break;case 90:R=T.createLinearGradient(Q+S,P,Q,P);break;case 135:R=T.createLinearGradient(Q+S,P,Q,P+M);break;case 180:R=T.createLinearGradient(Q,P,Q,P+M);break;case 225:R=T.createLinearGradient(Q,P,Q+S,P+M);break;case 270:R=T.createLinearGradient(Q,P,Q+S,P);break;case 315:R=T.createLinearGradient(Q,P+M,Q+S,P);break;default:R=T.createLinearGradient(Q,P+M,Q,P);break;}I=F.length;H=0;for(K=0;K<I;++K){J=F[K];N=L[K]||H;R.addColorStop(N,J);H=(K+1)/I;}return R;},_getRadialGradient:function(R,L,N){var F="_"+N,E=this[F+"Colors"],K=this[F+"Ratios"],J,H,P=this._x,O=this._y,I,M,G,Q,S=this._context;Q=S.createRadialGradient(P+R/2,O+R/2,R/2,P+R,O+L,R/2);H=E.length;G=0;for(J=0;J<H;++J){I=E[J];M=K[J]||G;Q.addColorStop(M,I);G=(J+1)/H;}return Q;},endFill:function(){var E=this._canvas,F=this._context,G;if(this._fillType){G=this._getFill();if(G){F.fillStyle=G;}}F.closePath();if(this._fillType){F.fill();}if(this._stroke){F.stroke();}this._initProps();return this;},lineGradientStyle:function(){return this;},lineStyle:function(L,I,H,K,M,G,E,J){I=I||"#000000";var F=this._context;if(this._stroke){F.stroke();}F.lineWidth=L;if(L){this._stroke=1;}else{this._stroke=0;}if(I){F.strokeStyle=I;if(H){F.strokeStyle=this._2RGBA(F.strokeStyle,H);}}if(G==="butt"){G="none";}if(F.lineCap){}return this;},lineTo:function(M,L,H){var K=arguments,G=this._canvas,F=this._context,E=this._width,N=this._height,I,J;if(typeof M==="string"||typeof M==="number"){K=[[M,L]];}for(I=0,J=K.length;I<J;++I){F.lineTo(K[I][0],K[I][1]);this._trackSize.apply(this,K[I]);}return this;},moveTo:function(E,F){this._context.moveTo(E,F);this._trackPos(E,F);return this;},render:function(E){E=E||D.config.doc.body;E.appendChild(this._canvas);this._canvas.width=E.offsetWidth;this._canvas.height=E.offsetHeight;return this;}};D.Graphic=C;var A=function(E){this.initializer.apply(this,arguments);};A.prototype={initializer:function(F){F=F||{};var E=F.width||0,G=F.height||0;this._vml=this._createGraphics();this.setSize(E,G);this._initProps();},_initProps:function(){this._fillColor="#000000";this._strokeColor="#000000";this._strokeWeight=0;this._path="";this._width=0;this._height=0;this._x=0;this._y=0;this._fill=0;this._stroke=0;},_createGraphics:function(){var E=this.createGraphicNode("group");E.style.display="inline-block";E.style.position="relative";return E;},beginBitmapFill:function(){return this;},beginFill:function(E,F){if(E){if(F){this._fillProps={type:"solid",opacity:F};}this._fillColor=E;this._fill=1;}return this;},beginGradientFill:function(J,G,F,K,I){var H=1,E=G.length,L={type:(J==="linear")?"gradient":"GradientRadial",color:G[0],angle:I};for(;H<E;++H){L["color"+(H+1)]=G[H];}this._fillProps=L;return this;},clear:function(){this._path="";return this;},curveTo:function(G,F,E,H){return this;},drawCircle:function(E,K,G,J,F,H){this._width=this._height=G*2;this._x=E;this._y=K;this._shape="oval";var I=this.createGraphicNode("oval");I.style.width=this._width+"px";I.style.height=this._height+"px";I.style.left=E+"px";
I.style.top=K+"px";I.strokeColor=this._fillColor;I.fillColor=this._fillColor;this._vml.appendChild(I);return this;},drawRect:function(E,H,F,G){this.moveTo(E,H).lineTo(E+F,H).lineTo(E+F,H+G).lineTo(E,H+G).lineTo(E,H);this._trackSize(F+E,G+H);return this;},_trackSize:function(E,F){if(E>this._width){this._width=E;}if(F>this._height){this._height=E;}},_trackPos:function(E,F){if(E>this._x){this._x=E;}if(F>this._y){this._y=F;}},_shape:"shape",drawRoundRect:function(E,J,G,I,F,H){return this;},endFill:function(){if(this._shape!=="shape"){return;}var G=this.createGraphicNode(this._shape),E=this._width,H=this._height,F=this._fillProps,J,I;if(this._path){this._path+=" x e";G.path=this._path;}else{G.style.left=this._x;G.style.top=this._y;G.style.position="relative";}if(this._fill){G.fillColor=this._fillColor;}if(this._stroke){G.strokeColor=this._strokeColor;G.strokeWeight=this._strokeWeight;}else{G.stroked=false;}G.style.width=E+"px";G.style.height=H+"px";G.coordSize=E+", "+H;if(F&&this._shape==="shape"){I=this.createGraphicNode("fill");for(J in F){if(F.hasOwnProperty(J)){I.setAttribute(J,F[J]);}}G.appendChild(I);}this._vml.appendChild(G);this._initProps();return this;},lineGradientStyle:function(){return this;},lineStyle:function(H,G,L,J,I,K,E,F){this._stroke=1;this._strokeWeight=H*0.7;this._strokeColor=G;return this;},lineTo:function(J,I,G){var F=arguments,H,E;if(typeof J==="string"||typeof J==="number"){F=[[J,I]];}E=F.length;this._shape="shape";this._path+=" l ";for(H=0;H<E;++H){this._path+=" "+F[H][0]+", "+F[H][1];this._trackSize.apply(this,F[H]);}return this;},moveTo:function(E,F){this._path+=" m "+E+", "+F;return this;},setSize:function(E,F){this._vml.style.width=E+"px";this._vml.style.height=F+"px";this._vml.coordSize=E+" "+F;},createGraphicNode:function(E){return document.createElement("<"+E+' xmlns="urn:schemas-microsft.com:vml" class="vml'+E+'"/>');},render:function(G){var E=G.offsetWidth,F=G.offsetHeight;G=G||D.config.doc.body;G.appendChild(this._vml);this.setSize(E,F);this._initProps();return this;}};if(D.UA.ie){var B=document.createStyleSheet();B.addRule(".vmlgroup","behavior:url(#default#VML)",B.rules.length);B.addRule(".vmlgroup","display:inline-block",B.rules.length);B.addRule(".vmlgroup","zoom:1",B.rules.length);B.addRule(".vmlshape","behavior:url(#default#VML)",B.rules.length);B.addRule(".vmlshape","display:inline-block",B.rules.length);B.addRule(".vmloval","behavior:url(#default#VML)",B.rules.length);B.addRule(".vmloval","display:inline-block",B.rules.length);B.addRule(".vmlfill","behavior:url(#default#VML)",B.rules.length);D.Graphic=A;}},"@VERSION@");