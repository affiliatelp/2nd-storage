// HTMLが完全に読み込まれてから実行する設定
window.addEventListener('DOMContentLoaded', () => {
  
  // 1. 操作する要素をすべて取得
  const btn = document.querySelector('.toggle_btn');
  const nav = document.querySelector('nav');
  const mask = document.getElementById('mask');

  // 要素が1つでも見つからない場合はエラーを表示して中断（デバッグ用）
  if (!btn || !nav || !mask) {
    console.error("要素が見つかりません。クラス名(toggle_btn, nav)やID(mask)が正しいか確認してください。");
    return;
  }

  // 2. クリックした時の「開閉処理」を関数として定義
  const toggleMenu = () => {
    btn.classList.toggle('active'); // ボタンを「×」にするクラスを付け外し
    nav.classList.toggle('open');   // メニューを出すクラスを付け外し
    mask.classList.toggle('open');  // 背景を暗くするクラスを付け外し
    
    // メニューが開いている時は、後ろの画面をスクロールさせない
    if (nav.classList.contains('open')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  // 3. 各要素にクリックイベントを登録
  // ボタンをクリックした時
  btn.addEventListener('click', toggleMenu);
  
  // 暗い背景をクリックした時（メニューを閉じる）
  mask.addEventListener('click', toggleMenu);

  // 4. メニュー内のリンクをクリックした時（ページ内移動したらメニューを閉じる）
  const navLinks = document.querySelectorAll('nav a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      // openクラスなどが残らないように強制的に除去する
      btn.classList.remove('active');
      nav.classList.remove('open');
      mask.classList.remove('open');
      document.body.style.overflow = 'auto';
    });
  });

});