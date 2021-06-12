// Enable the passage of the 'this' object through the JavaScript timers

var __nativeST__ = window.setTimeout, __nativeSI__ = window.setInterval;

window.setInterval = function (vCallback, nDelay /*, argumentToPass1, argumentToPass2, etc. */) {
  var oThis = this, aArgs = Array.prototype.slice.call(arguments, 2);
  return __nativeSI__(vCallback instanceof Function ? function () {
    vCallback.apply(oThis, aArgs);
  } : vCallback, nDelay);
};

//ここグローバルになってるので可能ならスコープを狭めたいっす。
var IntervID;
let notes = [];
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

class Note {
	constructor(canvas,ctx,no,y) {
		this.canvas = canvas;
		this.ctx = ctx;
		this.no = no;
		this.y = y;
	}

	writenote(){
	//ノーツの色の設定
	if(this.no == 0){
		this.ctx.fillStyle = '#DD7070';
	}
	else if(this.no % 2 == 1){
		this.ctx.fillStyle = '#DDDDDD';
	}
	else{
		this.ctx.fillStyle = '#5252DD';
	}
	//ノーツの描画
	this.ctx.fillRect(this.no * 32, this.y, 32, 10);

	this.y = this.y + 1;
	
	console.log(this.y);
	}
}

//自分自身を一度呼び出す関数っす。
(function () {

}());

//HTML側Bodyのonlordに書かれているので、この関数はBodyの読み込みが終わったら呼ばれるはず
function startClock() {
	IntervID = window.setInterval(frame, 25);
}

//ここに、一フレームにつき行う動作を描く
function frame() {
	//画面のリフレッシュ
	ctx.clearRect(0,0,3000,3000);
	//譜面生成(要改善)
	var R = Math.floor(Math.random() * 90 );
	if(R < 9 && notes.length < 10000){notes.push(new Note(canvas,ctx,R,10))}
	//存在するすべてのNoteオブジェクトの時を進める
	for(let i = 0;i < notes.length;i++){
	notes[i].writenote();
}
}