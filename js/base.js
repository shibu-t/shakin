//<!--
google.load("feeds", "1");
var entryArray = new Array();
var entryNum = 0;
//	alert(entryArray.length);
 
function initialize() {
	feedAdd("http://underworld2ch.blog29.fc2.com/?xml", 0);//アンダーワールド
	feedAdd("http://gasoku.livedoor.biz/index.rdf", 0);//ヴィブロ
	feedAdd("http://blog.livedoor.jp/vipsister23/index.rdf", 0);//妹はVipper
	feedAdd("http://blog.livedoor.jp/news23vip/index.rdf", 0);//VIPPERな俺
	feedAdd("http://mudainodqnment.ldblog.jp/index.rdf", 0);//無題のドキュメント
	feedAdd("http://blog.livedoor.jp/nicovip2ch/index.rdf", 0);//ニコニコVIP2ch
	feedAdd("http://chaos2ch.com/index.rdf", 0);//カオスちゃんねる
	feedAdd("http://mamesoku.com/index.rdf", 0);//まめ速
	feedAdd("http://digital-thread.com/index.rdf", 0);//デジタルニューススレッド
	feedAdd("http://brow2ing.doorblog.jp/index.rdf", 0);//ブラブラブラウジング
	feedAdd("http://bipblog.com/index.rdf", 0);//BIPブログ
	feedAdd("http://blog.livedoor.jp/insidears/index.rdf", 0);//ニュー速VIPブログ(`･ω･´)
	feedAdd("http://blog.livedoor.jp/himasoku123/index.rdf", 0);//暇人速報
	feedAdd("http://suiseisekisuisui.blog107.fc2.com/?xml", 0);//すくいぬ
	feedAdd("http://workingnews.blog117.fc2.com/?xml", 0);//働くモノニュース
	feedAdd("http://news020.blog13.fc2.com/?xml", 0);//ニュース２ちゃんねる
	feedAdd("http://news4vip.livedoor.biz/index.rdf", 0);//ニュー速クオリティ
	feedAdd("http://blog.livedoor.jp/dqnplus/index.rdf", 0);//痛いニュース
	feedAdd("http://blog.livedoor.jp/kinisoku/index.rdf",0);//キニ速
	feedAdd("http://blog.livedoor.jp/goldennews/index.rdf",0);//キニ速
	//feedAdd("", 0);//
	feedAdd("http://michaelsan.livedoor.biz/index.rdf ", 1);//もみあげチャーシュー
}
 
//取得するフィードの追加（rssUrl：フィードのURL , boolNum：追加するフィードURLが最後の場合「1」を入れる）
function feedAdd(rssUrl, boolNum) {
	var feed = new google.feeds.Feed(rssUrl);//フィードの取得
	feed.setNumEntries(10);//ブログ1つあたりの取得するフィード数
	feed.load(function(result) {
		if (!result.error) {
			for (var i = 0; i < result.feed.entries.length; i++) {
				entryArray.push(result.feed.entries[i]);
				var date = new Date(result.feed.entries[i].publishedDate);
				entryArray[entryNum].sortDate = ( date.getFullYear()*100000000 ) + ( (date.getMonth() + 1)*1000000 ) + ( date.getDate()*10000 ) + ( (date.getHours()*100) + date.getMinutes() );//ソート用（日付）を連想配列に代入
				entryArray[entryNum].blogName = result.feed.title;//ブログ名を連想配列に代入
				entryArray[entryNum].blogLink = result.feed.link;//ブログURLを連想配列に代入
				entryNum+=1;
			}
		}
		if(boolNum==1){
			feedOutput("feed", 100);//フィードの出力
		}
	});
}
 
//フィードの出力（feedId：出力するオブジェクトのID , listNum：出力するリスト数。「0」の場合全て）
function feedOutput(feedId, listNum){
	var useFeed = "";
	var container = document.getElementById(feedId);//表示部分を選択
	entryArray = asort(entryArray, "sortDate");//日付でソート
	if(listNum==0){
		listNum = entryNum;
	}
	for (var i = 0; i < listNum; i++) {
		var entry = entryArray[i];
		var date = new Date(entry.publishedDate);//日付の表示変更
		//useFeed += '<li>' + date.getFullYear() + '/' + (date.getMonth() + 1 ) + '/' + date.getDate() + '/' + date.getHours() + ':' + date.getMinutes() + '　<a href="' + entry.link + '" target="_blank">' + entry.title + '</a>（' + entry.blogName + '）</li>';//HTMLで書き出し
		if(date.getMinutes() < 10){
			useFeed += '<tr><td id=\"date\">' +(date.getMonth() + 1 ) + '/' + date.getDate() + '/' + date.getHours() + ':0' + date.getMinutes() + '　</td><td id=\"articletitle\"><a id=\"entryLink\" href=\"' + entry.link + '" target="_blank">' + entry.title + '</a></td><td><img src="http://b.hatena.ne.jp/entry/image/'+entry.link+'"></td><td id=\"blogname\"><a href=\"'+entry.blogLink+'\" target="_blank">' + entry.blogName + '</a></td></tr>';//HTMLで書き出し
		}else{
			useFeed += '<tr><td id=\"date\">' +(date.getMonth() + 1 ) + '/' + date.getDate() + '/' + date.getHours() + ':' + date.getMinutes() + '　</td><td id=\"articletitle\"><a id=\"entryLink\" href=\"' + entry.link + '" target="_blank">' + entry.title + '</a></td><td id=\"hatena\"><img src="http://b.hatena.ne.jp/entry/image/'+entry.link+'"></td><td id=\"blogname\"><a href=\"'+entry.blogLink+'\" target="_blank">' + entry.blogName + '</a></td></tr>';//HTMLで書き出し
		}
	}
	container.innerHTML = '<table>' + useFeed + '</table>';
}
function asort(myArray, key){
	//return myArray.sort ( function (b1, b2) { return b1[key] > b2[key] ? 1 : -1; } );//昇順
	return myArray.sort ( function (b1, b2) { return b1[key] > b2[key] ? -1 : 1; } );//降順
}

var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");
document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E"));
 
try {
var pageTracker = _gat._getTracker("UA-11895098-1");
pageTracker._trackPageview();
} catch(err) {}
 
google.setOnLoadCallback(initialize);
//-->
