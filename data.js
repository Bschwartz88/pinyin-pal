// ============ Pinyin Pal — content data (Stage 1: Phase 0 sound foundation) ============
// NOTE: `hz` (hanzi) is used ONLY as input to the speech synthesizer so tones are
// pronounced correctly. It is never shown in the UI — learner sees pinyin only.

const TONES = {
  1: { name: "1st tone", mark: "ˉ", color: "var(--t1)", colorHex: "#3a6ea5",
       desc: "High and flat — hold a steady singing note.",
       tip: "Pretend you're at the doctor saying “aaah”. Don't let it drop!",
       shape: t => 0.82 },
  2: { name: "2nd tone", mark: "ˊ", color: "var(--t2)", colorHex: "#3d8f6f",
       desc: "Rising — like asking “huh?” in English.",
       tip: "Start mid, glide up like a question: “what?”",
       shape: t => 0.35 + 0.5 * t },
  3: { name: "3rd tone", mark: "ˇ", color: "var(--t3)", colorHex: "#e0a53c",
       desc: "Low dip — falls, then rises. The “skeptical” tone.",
       tip: "Say “well…” doubtfully. Let your voice sink low first.",
       shape: t => 0.45 - 0.38 * Math.sin(Math.PI * Math.min(t * 1.25, 1)) + (t > 0.6 ? (t - 0.6) * 0.9 : 0) },
  4: { name: "4th tone", mark: "ˋ", color: "var(--t4)", colorHex: "#c8393c",
       desc: "Sharp fall — like a firm “No!”",
       tip: "Short and decisive, like stamping your foot.",
       shape: t => 0.88 - 0.62 * t },
};

// Syllable families: same syllable, different tones = different words.
// Chosen for travel / restaurants / meeting people.
const FAMILIES = [
  { syl: "ma", items: [
    { hz: "妈", py: "mā", tone: 1, en: "mom" },
    { hz: "麻", py: "má", tone: 2, en: "numb (spicy!)" },
    { hz: "马", py: "mǎ", tone: 3, en: "horse" },
    { hz: "骂", py: "mà", tone: 4, en: "to scold" } ]},
  { syl: "tang", items: [
    { hz: "汤", py: "tāng", tone: 1, en: "soup" },
    { hz: "糖", py: "táng", tone: 2, en: "sugar / candy" },
    { hz: "躺", py: "tǎng", tone: 3, en: "to lie down" },
    { hz: "烫", py: "tàng", tone: 4, en: "scalding hot" } ]},
  { syl: "shu", items: [
    { hz: "书", py: "shū", tone: 1, en: "book" },
    { hz: "熟", py: "shú", tone: 2, en: "cooked / ripe" },
    { hz: "鼠", py: "shǔ", tone: 3, en: "mouse" },
    { hz: "树", py: "shù", tone: 4, en: "tree" } ]},
  { syl: "wen", items: [
    { hz: "温", py: "wēn", tone: 1, en: "warm" },
    { hz: "文", py: "wén", tone: 2, en: "language / culture" },
    { hz: "吻", py: "wěn", tone: 3, en: "kiss" },
    { hz: "问", py: "wèn", tone: 4, en: "to ask" } ]},
  { syl: "wu", items: [
    { hz: "屋", py: "wū", tone: 1, en: "room / house" },
    { hz: "无", py: "wú", tone: 2, en: "without" },
    { hz: "五", py: "wǔ", tone: 3, en: "five" },
    { hz: "雾", py: "wù", tone: 4, en: "fog" } ]},
  { syl: "bao", items: [
    { hz: "包", py: "bāo", tone: 1, en: "bun / bag" },
    { hz: "薄", py: "báo", tone: 2, en: "thin" },
    { hz: "饱", py: "bǎo", tone: 3, en: "full (after eating)" },
    { hz: "抱", py: "bào", tone: 4, en: "to hug" } ]},
  { syl: "bei", items: [
    { hz: "杯", py: "bēi", tone: 1, en: "cup" },
    { hz: "北", py: "běi", tone: 3, en: "north" },
    { hz: "被", py: "bèi", tone: 4, en: "by (passive)" } ]},
  { syl: "qian", items: [
    { hz: "千", py: "qiān", tone: 1, en: "thousand" },
    { hz: "钱", py: "qián", tone: 2, en: "money" },
    { hz: "浅", py: "qiǎn", tone: 3, en: "shallow" },
    { hz: "欠", py: "qiàn", tone: 4, en: "to owe" } ]},
  { syl: "xiang", items: [
    { hz: "香", py: "xiāng", tone: 1, en: "fragrant / delicious-smelling" },
    { hz: "想", py: "xiǎng", tone: 3, en: "to want / think" },
    { hz: "象", py: "xiàng", tone: 4, en: "elephant" } ]},
  { syl: "shi", items: [
    { hz: "诗", py: "shī", tone: 1, en: "poem" },
    { hz: "十", py: "shí", tone: 2, en: "ten" },
    { hz: "史", py: "shǐ", tone: 3, en: "history" },
    { hz: "是", py: "shì", tone: 4, en: "to be / yes" } ]},
  { syl: "cha", items: [
    { hz: "叉", py: "chā", tone: 1, en: "fork" },
    { hz: "茶", py: "chá", tone: 2, en: "tea" },
    { hz: "差", py: "chà", tone: 4, en: "lacking / not good" } ]},
  { syl: "mai", items: [
    { hz: "买", py: "mǎi", tone: 3, en: "to buy" },
    { hz: "卖", py: "mài", tone: 4, en: "to sell" } ]},
];

// Speaking practice targets (Pitch Painter) — start easy, single syllables.
const SPEAK_TARGETS = [
  { hz: "妈", py: "mā", tone: 1, en: "mom" },
  { hz: "茶", py: "chá", tone: 2, en: "tea" },
  { hz: "好", py: "hǎo", tone: 3, en: "good" },
  { hz: "是", py: "shì", tone: 4, en: "to be / yes" },
  { hz: "汤", py: "tāng", tone: 1, en: "soup" },
  { hz: "钱", py: "qián", tone: 2, en: "money" },
  { hz: "五", py: "wǔ", tone: 3, en: "five" },
  { hz: "烫", py: "tàng", tone: 4, en: "scalding hot" },
  { hz: "杯", py: "bēi", tone: 1, en: "cup" },
  { hz: "十", py: "shí", tone: 2, en: "ten" },
  { hz: "买", py: "mǎi", tone: 3, en: "to buy" },
  { hz: "问", py: "wèn", tone: 4, en: "to ask" },
];

// Minimal pairs (Sound Match) — the consonants & vowels that trip up English speakers.
const PAIRS = [
  { a: { hz: "知", py: "zhī", en: "to know" },   b: { hz: "鸡", py: "jī", en: "chicken" },   note: "zh = tongue curled back; j = tongue flat, lips wide" },
  { a: { hz: "吃", py: "chī", en: "to eat" },    b: { hz: "七", py: "qī", en: "seven" },     note: "ch = tongue curled back; q = like 'ch' with a smile" },
  { a: { hz: "是", py: "shì", en: "to be" },     b: { hz: "细", py: "xì", en: "thin/fine" }, note: "sh = tongue curled back; x = soft hiss, tongue flat" },
  { a: { hz: "四", py: "sì", en: "four" },       b: { hz: "是", py: "shì", en: "to be" },    note: "s = plain hiss; sh = tongue curled back" },
  { a: { hz: "擦", py: "cā", en: "to wipe" },    b: { hz: "叉", py: "chā", en: "fork" },     note: "c = 'ts' as in cats; ch = curled back" },
  { a: { hz: "乐", py: "lè", en: "happy" },      b: { hz: "热", py: "rè", en: "hot" },       note: "Mandarin r = buzzy, between 'r' and 'j' in 'measure'" },
  { a: { hz: "路", py: "lù", en: "road" },       b: { hz: "绿", py: "lǜ", en: "green" },     note: "ü = say 'ee' with rounded lips" },
  { a: { hz: "爸", py: "bà", en: "dad" },        b: { hz: "怕", py: "pà", en: "afraid" },    note: "p has a puff of air; b doesn't" },
  { a: { hz: "肚", py: "dù", en: "belly" },      b: { hz: "兔", py: "tù", en: "rabbit" },    note: "t has a puff of air; d doesn't" },
  { a: { hz: "个", py: "gè", en: "(measure word)" }, b: { hz: "课", py: "kè", en: "class" }, note: "k has a puff of air; g doesn't" },
];

// ===== Vocabulary track: useful words & phrases (pinyin display, hanzi for TTS only) =====
const VOCAB = [
  { cat: "Greetings & basics", icon: "👋", words: [
    { hz: "你好", py: "nǐ hǎo", en: "hello" },
    { hz: "你好吗", py: "nǐ hǎo ma?", en: "how are you?" },
    { hz: "我很好", py: "wǒ hěn hǎo", en: "I'm very good" },
    { hz: "谢谢", py: "xièxie", en: "thank you" },
    { hz: "不客气", py: "bú kèqi", en: "you're welcome" },
    { hz: "再见", py: "zàijiàn", en: "goodbye" },
    { hz: "请", py: "qǐng", en: "please" },
    { hz: "对不起", py: "duìbuqǐ", en: "sorry" },
    { hz: "没关系", py: "méi guānxi", en: "no problem / it's OK" },
    { hz: "早上好", py: "zǎoshang hǎo", en: "good morning" },
    { hz: "晚安", py: "wǎn'ān", en: "good night" },
    { hz: "是", py: "shì", en: "yes / to be" },
    { hz: "不是", py: "bú shì", en: "no / is not" } ]},
  { cat: "Meeting people", icon: "🤝", words: [
    { hz: "我叫布莱恩", py: "wǒ jiào Brian", en: "my name is Brian" },
    { hz: "你叫什么名字", py: "nǐ jiào shénme míngzi?", en: "what's your name?" },
    { hz: "很高兴认识你", py: "hěn gāoxìng rènshi nǐ", en: "nice to meet you" },
    { hz: "我是美国人", py: "wǒ shì Měiguó rén", en: "I'm American" },
    { hz: "你说英文吗", py: "nǐ shuō Yīngwén ma?", en: "do you speak English?" },
    { hz: "我听不懂", py: "wǒ tīng bù dǒng", en: "I don't understand" },
    { hz: "请再说一遍", py: "qǐng zài shuō yí biàn", en: "please say it again" },
    { hz: "慢一点", py: "màn yìdiǎn", en: "a little slower" },
    { hz: "好的", py: "hǎo de", en: "OK / sure" },
    { hz: "我学中文", py: "wǒ xué Zhōngwén", en: "I'm learning Chinese" },
    { hz: "朋友", py: "péngyou", en: "friend" },
    { hz: "你呢", py: "nǐ ne?", en: "and you?" } ]},
  { cat: "Food & restaurant", icon: "🥟", words: [
    { hz: "吃饭", py: "chī fàn", en: "to eat (a meal)" },
    { hz: "喝", py: "hē", en: "to drink" },
    { hz: "茶", py: "chá", en: "tea" },
    { hz: "水", py: "shuǐ", en: "water" },
    { hz: "米饭", py: "mǐfàn", en: "rice" },
    { hz: "面条", py: "miàntiáo", en: "noodles" },
    { hz: "饺子", py: "jiǎozi", en: "dumplings" },
    { hz: "牛肉", py: "niúròu", en: "beef" },
    { hz: "鸡肉", py: "jīròu", en: "chicken (meat)" },
    { hz: "菜", py: "cài", en: "dish / vegetable" },
    { hz: "好吃", py: "hǎochī", en: "delicious" },
    { hz: "我要这个", py: "wǒ yào zhè ge", en: "I want this one" },
    { hz: "菜单", py: "càidān", en: "menu" },
    { hz: "买单", py: "mǎidān", en: "the check, please" },
    { hz: "干杯", py: "gānbēi", en: "cheers!" },
    { hz: "我吃饱了", py: "wǒ chī bǎo le", en: "I'm full" },
    { hz: "辣", py: "là", en: "spicy" },
    { hz: "不要辣", py: "bú yào là", en: "not spicy, please" } ]},
  { cat: "Shopping & numbers", icon: "🛍️", words: [
    { hz: "多少钱", py: "duōshǎo qián?", en: "how much money?" },
    { hz: "太贵了", py: "tài guì le", en: "too expensive!" },
    { hz: "便宜一点", py: "piányi yìdiǎn", en: "a little cheaper?" },
    { hz: "一", py: "yī", en: "one" },
    { hz: "二", py: "èr", en: "two" },
    { hz: "三", py: "sān", en: "three" },
    { hz: "四", py: "sì", en: "four" },
    { hz: "五", py: "wǔ", en: "five" },
    { hz: "六", py: "liù", en: "six" },
    { hz: "七", py: "qī", en: "seven" },
    { hz: "八", py: "bā", en: "eight" },
    { hz: "九", py: "jiǔ", en: "nine" },
    { hz: "十", py: "shí", en: "ten" },
    { hz: "块", py: "kuài", en: "yuan (money unit)" },
    { hz: "这个", py: "zhè ge", en: "this one" },
    { hz: "那个", py: "nà ge", en: "that one" },
    { hz: "有吗", py: "yǒu ma?", en: "do you have it?" },
    { hz: "没有", py: "méi yǒu", en: "don't have / there isn't" } ]},
  { cat: "Connectors & glue words", icon: "🔗", words: [
    { hz: "和", py: "hé", en: "and" },
    { hz: "也", py: "yě", en: "also" },
    { hz: "可是", py: "kěshì", en: "but" },
    { hz: "因为", py: "yīnwèi", en: "because" },
    { hz: "所以", py: "suǒyǐ", en: "so / therefore" },
    { hz: "然后", py: "ránhòu", en: "then / after that" },
    { hz: "现在", py: "xiànzài", en: "now" },
    { hz: "以后", py: "yǐhòu", en: "later" },
    { hz: "还", py: "hái", en: "still / in addition" },
    { hz: "都", py: "dōu", en: "all / both" },
    { hz: "很", py: "hěn", en: "very" },
    { hz: "一点", py: "yìdiǎn", en: "a little" } ]},
];

// Coach lines — varied so it never feels canned.
const PRAISE = [
  "Piàoliang! (Beautiful!) 🎉", "Hěn hǎo! (Very good!) ✨", "Nailed it! 🎯",
  "Duì le! (Correct!) 🙌", "Your ears are getting sharp! 👂", "Bàng! (Awesome!) 💪",
];
const ENCOURAGE = [
  "Close one — listen again 👂", "Tricky! Even locals' kids mix these up.",
  "Almost — replay it and watch the curve.", "Good try — tones take a few days to click.",
];

const TONE_EXPLAIN = {
  1: "Flat and high, like holding a note.",
  2: "Rises like a question: “huh?”",
  3: "Dips low, then comes back up.",
  4: "Falls sharply, like a firm “No!”",
};

if (typeof module !== "undefined") module.exports = { TONES, FAMILIES, SPEAK_TARGETS, PAIRS, VOCAB };
