// ==============================
// 4択×3問 デモ版（STEP3）
// ==============================

// 質問データ（まずは3問で動作確認）
const questions = [
  {
    text: "【Q1】この薬局は、現場が回らないときの応援体制がある？",
    choices: [
      { label: "常にある（他店・本部がすぐ動く）", value: 3 },
      { label: "だいたいある（誰かがカバーできる）", value: 2 },
      { label: "あまりない（現場で何とかする）", value: 1 },
      { label: "ほぼない（個人依存・属人化）", value: 0 },
    ],
  },
  {
    text: "【Q2】この薬局は、業務が標準化（マニュアル・ルール化）されている？",
    choices: [
      { label: "かなりされている（誰でも回せる）", value: 3 },
      { label: "一部されている（重要部分だけ）", value: 2 },
      { label: "あまりされていない（人による）", value: 1 },
      { label: "ほぼされていない（職人技）", value: 0 },
    ],
  },
  {
    text: "【Q3】この薬局は、患者さんのフォローや再来につながる仕組みがある？",
    choices: [
      { label: "ある（LINE・電話・服薬フォロー等が定着）", value: 3 },
      { label: "一部ある（人によって実施）", value: 2 },
      { label: "ほぼない（忙しくて後回し）", value: 1 },
      { label: "ない（その場対応のみ）", value: 0 },
    ],
  },
];

// DOM（HTML内の要素を取得）
const elCurrent = document.getElementById("current");
const elTotal = document.getElementById("total");
const elQuestion = document.getElementById("question");
const elChoiceButtons = Array.from(document.querySelectorAll(".choice"));

// 進捗・スコア管理
let currentIndex = 0;
let totalScore = 0;

// 初期化
function init() {
  elTotal.textContent = String(questions.length);
  renderQuestion();
  bindEvents();
}

// 質問を表示
function renderQuestion() {
  const q = questions[currentIndex];

  // 進捗表示
  elCurrent.textContent = String(currentIndex + 1);

  // 質問文
  elQuestion.textContent = q.text;

  // 4択ボタンのラベルと value を差し替え
  elChoiceButtons.forEach((btn, i) => {
    btn.textContent = q.choices[i].label;
    btn.dataset.value = String(q.choices[i].value);
  });
}

// クリックイベントを登録
function bindEvents() {
  elChoiceButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const value = Number(btn.dataset.value || 0);
      totalScore += value;

      // 次の質問へ
      currentIndex++;

      // 終了判定（3問終わったら結果へ）
      if (currentIndex >= questions.length) {
        goToResult();
      } else {
        renderQuestion();
      }
    });
  });
}

// 結果ページへ遷移（typeは仮ロジック）
function goToResult() {
  // 仮の判定（0〜9点の範囲）
  // 例：0-3: caution / 4-6: stable / 7-9: strong
  let type = "caution";
  if (totalScore >= 7) type = "strong";
  else if (totalScore >= 4) type = "stable";

  // 結果ページへ（type と score をURLで渡す）
  const url = `result.html?type=${encodeURIComponent(type)}&score=${encodeURIComponent(totalScore)}`;
  window.location.href = url;
}

// 実行
init();
