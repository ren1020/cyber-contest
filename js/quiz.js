const quizData = [
  {
    id: 1,
    category: 'Forensics / 入門',
    q: 'パソコンから「秘密の情報が隠されている画像.jpg」が見つかりました。画像自体は普通に見えます。最初に調べるものとして最も適切なのはどれ？',
    choices: ['画像のEXIFなどのメタデータ', 'パソコンのCPU温度', 'キーボードのメーカー', 'モニターの解像度'],
    answer: 0,
    hint: '画像の見た目では分からない情報を調べます。',
    explanation: '画像には撮影日時や機器情報などのメタデータが保存されている場合があります。'
  },
  {
    category: 'Crypto / 入門',
    q: '次の文字列を復号すると「Hello」になります。使用されている方式はどれ？ SGVsbG8=',
    choices: ['SHA-256', 'Base64', 'AES', 'ROT13'],
    answer: 1,
    hint: '文字列の最後が「=」で終わっています。',
    explanation: 'Base64は、データを文字列として扱いやすくするエンコード方式です。'
  },
  {
    category: 'Web / 入門',
    q: 'ログイン画面でパスワードを何度間違えてもアカウントがロックされません。どの問題につながる可能性がある？',
    choices: ['総当たり攻撃を受けやすい', '画面の色が変わる', 'CPUが必ず故障する', 'DNSが使えなくなる'],
    answer: 0,
    hint: 'パスワードを大量に試す攻撃を考えます。',
    explanation: 'ログイン試行回数を制限しないと、ブルートフォース攻撃を受けやすくなります。'
  },
  {
    category: 'Network / 入門',
    q: 'URLが http://example.com となっていました。httpは何を表している？',
    choices: ['ファイル形式', '通信プロトコル', 'パスワード', 'IPアドレス'],
    answer: 1,
    hint: 'Webブラウザとサーバーが通信するときの決まりです。',
    explanation: 'HTTPはWebブラウザとWebサーバーなどが通信するためのプロトコルです。'
  },
  {
    category: 'Forensics / 入門',
    q: '大量のログファイルから flag{ という文字列を探したい。Linuxの代表的な検索コマンドはどれ？',
    choices: ['grep', 'mkdir', 'cd', 'clear'],
    answer: 0,
    hint: 'ファイルの中身から指定した文字列を探すコマンドです。',
    explanation: 'grepはファイルなどから指定した文字列を検索するために使います。'
  },
  {
    category: 'Programming / 入門',
    q: '次のPythonコードを実行すると何が表示される？ x = 10、x = x + 5、print(x)',
    choices: ['5', '10', '15', '105'],
    answer: 2,
    hint: 'xに最初の値を入れたあと、5を足します。',
    explanation: '最初にxは10です。その後、5を足すので15になります。'
  },
  {
    category: 'Security / 初級',
    q: '次のうち、「秘密にしておくべき情報」はどれ？',
    choices: ['Webサイトのロゴ画像', '公開されている会社の住所', 'ユーザーのパスワード', 'Webサイトのタイトル'],
    answer: 2,
    hint: '第三者に知られると、アカウントを悪用される情報です。',
    explanation: 'パスワードなどの認証情報は、第三者に知られてはいけない重要な情報です。'
  },
  {
    category: 'Web / 初級',
    q: '検索フォームに「\'」を入力したところ、データベースエラーが表示されました。疑うべき脆弱性はどれ？',
    choices: ['SQLインジェクション', 'Bluetooth攻撃', 'DDoS攻撃', '物理的盗難'],
    answer: 0,
    hint: '入力値がデータベースのSQL文に影響している可能性があります。',
    explanation: '特殊な入力でSQLエラーが出る場合、入力値がSQL文に適切に処理されず組み込まれている可能性があります。'
  },
  {
    category: 'Network / 初級',
    q: 'ネットワーク通信から 192.168.1.25 という情報が見つかりました。これは一般的に何を表している？',
    choices: ['MACアドレス', 'IPv4アドレス', 'メールアドレス', 'ポート番号'],
    answer: 1,
    hint: '4つの数字をドットで区切ったアドレスです。',
    explanation: '192.168.1.25はIPv4形式のアドレスです。192.168.x.xはプライベートIPアドレスとして使われます。'
  },
  {
    category: 'CTF基礎 / 入門',
    q: 'CTFで flag{security_is_fun} という文字列を見つけました。一般的に何をすればよい？',
    choices: ['パソコンを再起動する', 'Flagとして解答する', '文字列を削除する', 'Wi-Fiを切断する'],
    answer: 1,
    hint: 'flag{...}形式は、問題を解いた証拠として提出する文字列です。',
    explanation: 'CTFでは、flag{...}形式などのFlagを問題の解答として提出します。'
  }
];

let state = {
  index: 0,
  answers: Array(quizData.length).fill(null),
  solved: Array(quizData.length).fill(false),
  feedback: Array(quizData.length).fill('')
};

function renderQuestion() {
  const wrap = document.getElementById('questionWrap');
  const item = quizData[state.index];
  const selected = state.answers[state.index];

  wrap.innerHTML = `
    <div class="meta">CHALLENGE ${String(state.index + 1).padStart(2, '0')} / ${quizData.length} · ${item.category}</div>
    <div class="question">${item.q}</div>
    <p class="clue"><strong>MISSION</strong> 正しい選択肢を1つ選んでください。</p>
    <ul class="choices">
      ${item.choices.map((choice, choiceIndex) => `
        <li class="choice">
          <label>
            <input type="radio" name="choice" value="${choiceIndex}" ${selected === choiceIndex ? 'checked' : ''}>
            <span>${choice}</span>
          </label>
        </li>`).join('')}
    </ul>
    <button id="hintBtn" class="btn btn-secondary" type="button">ヒントを見る</button>
    <p id="hintText" class="hint" hidden>${item.hint}</p>
    <p class="feedback ${state.solved[state.index] ? 'success' : ''}" aria-live="polite">${state.feedback[state.index]}</p>
    ${state.solved[state.index] ? `<p class="explanation"><strong>解説:</strong> ${item.explanation}</p>` : ''}
  `;

  wrap.querySelectorAll('input[name="choice"]').forEach(input => {
    input.addEventListener('change', event => {
      state.answers[state.index] = Number(event.target.value);
    });
  });

  const hintBtn = document.getElementById('hintBtn');
  const hintText = document.getElementById('hintText');
  hintBtn.addEventListener('click', () => {
    hintText.hidden = !hintText.hidden;
    hintBtn.textContent = hintText.hidden ? 'ヒントを見る' : 'ヒントを隠す';
  });
}

function showResult() {
  const wrap = document.getElementById('questionWrap');
  const score = state.solved.filter(Boolean).length;
  wrap.innerHTML = `
    <div class="result">
      <div class="meta">MISSION COMPLETE</div>
      <h2>結果</h2>
      <p class="score">${score}<small> / ${quizData.length} QUESTIONS</small></p>
      <p>${score === quizData.length ? '全問正解です。' : '未回答または不正解の問題があります。'}</p>
      <p><button id="retry" class="btn">もう一度</button></p>
    </div>
  `;
  document.getElementById('retry').addEventListener('click', () => {
    state = {
      index: 0,
      answers: Array(quizData.length).fill(null),
      solved: Array(quizData.length).fill(false),
      feedback: Array(quizData.length).fill('')
    };
    renderQuestion();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const prev = document.getElementById('prevBtn');
  const next = document.getElementById('nextBtn');
  const submit = document.getElementById('submitBtn');

  renderQuestion();

  prev.addEventListener('click', () => {
    if (state.index > 0) {
      state.index--;
      renderQuestion();
    }
  });

  next.addEventListener('click', () => {
    if (state.index < quizData.length - 1) {
      state.index++;
      renderQuestion();
    }
  });

  submit.addEventListener('click', () => {
    const item = quizData[state.index];
    const selected = state.answers[state.index];

    if (selected === null) {
      state.feedback[state.index] = '選択肢を1つ選んでから提出してください。';
    } else if (selected === item.answer) {
      state.solved[state.index] = true;
      state.feedback[state.index] = '正解です。問題をクリアしました。';
    } else {
      state.feedback[state.index] = '不正解です。ヒントを確認して再挑戦しましょう。';
    }

    if (state.index === quizData.length - 1 && state.solved.every(Boolean)) {
      showResult();
    } else {
      renderQuestion();
    }
  });
});
