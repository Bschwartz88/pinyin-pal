// ============ Pinyin Pal — Lessons (instruction-first curriculum) ============
// Each lesson: id, title, emoji, intro (plain English), phrases[], notes[].
// Phrase fields:
//   hz    hanzi — ONLY used as input to the speech synthesizer, never shown
//   py    pinyin with tone marks (what the learner sees)
//   en    English meaning
//   parts optional word-by-word breakdown: [["nǐ","you"],["hǎo","good"]]
//         (also used as tiles by the Build-the-Sentence game)
//   tip   optional usage note: when to say it, what to watch out for
// Notes: short "how Chinese works" boxes shown inside the lesson.

const LESSONS = [
  // ------------------------------------------------------------------ 1
  { id: "hello", title: "Hello & goodbye", emoji: "👋",
    intro: "The first thing anyone says. Mandarin greetings are simple: there's one everyday “hello”, a more respectful version for older people, and a couple of ways to say bye. Tap each phrase to hear it, then say it out loud.",
    phrases: [
      { hz: "你好", py: "nǐ hǎo", en: "hello", parts: [["nǐ","you"],["hǎo","good"]],
        tip: "Literally “you good”. Works any time of day, with anyone." },
      { hz: "您好", py: "nín hǎo", en: "hello (respectful)", parts: [["nín","you (polite)"],["hǎo","good"]],
        tip: "Use nín for older relatives, elders, or anyone you want to show respect to. Same word, one extra ‘n’ sound." },
      { hz: "早上好", py: "zǎoshang hǎo", en: "good morning", parts: [["zǎoshang","morning"],["hǎo","good"]] },
      { hz: "早", py: "zǎo", en: "morning! (casual)", tip: "Just “zǎo” on its own is how most people greet each other in the morning — like saying “morning!”" },
      { hz: "晚上好", py: "wǎnshang hǎo", en: "good evening", parts: [["wǎnshang","evening"],["hǎo","good"]] },
      { hz: "晚安", py: "wǎn'ān", en: "good night", parts: [["wǎn","evening"],["ān","peace"]], tip: "Only when someone is going to bed — not a general evening goodbye." },
      { hz: "再见", py: "zàijiàn", en: "goodbye", parts: [["zài","again"],["jiàn","see"]], tip: "Literally “see (you) again”." },
      { hz: "拜拜", py: "bàibai", en: "bye-bye", tip: "Borrowed from English and extremely common, especially on the phone." },
      { hz: "明天见", py: "míngtiān jiàn", en: "see you tomorrow", parts: [["míngtiān","tomorrow"],["jiàn","see"]] },
      { hz: "一会儿见", py: "yíhuìr jiàn", en: "see you in a bit", parts: [["yíhuìr","a little while"],["jiàn","see"]] },
    ],
    notes: [
      { title: "nǐ vs. nín", body: "Both mean “you”. nǐ is normal; nín is the polite version for elders and people you're meeting formally. When in doubt with older family members, nín is never wrong." },
      { title: "The pattern “__ + hǎo”", body: "Morning, evening, hello — they all end in hǎo (good). Learn hǎo once and you've learned half of every greeting." },
    ] },

  // ------------------------------------------------------------------ 2
  { id: "thanks", title: "Thank you, please & sorry", emoji: "🙏",
    intro: "The politeness toolkit. These are short, used constantly, and instantly make you sound considerate. The replies (“you're welcome”, “it's fine”) matter as much as the phrases themselves.",
    phrases: [
      { hz: "谢谢", py: "xièxie", en: "thank you", tip: "The second syllable is soft and quick — almost swallowed." },
      { hz: "谢谢你", py: "xièxie nǐ", en: "thank you (to you)", parts: [["xièxie","thanks"],["nǐ","you"]], tip: "A touch warmer than plain xièxie." },
      { hz: "不客气", py: "bú kèqi", en: "you're welcome", parts: [["bú","not"],["kèqi","polite / formal"]], tip: "Literally “don't be so formal”." },
      { hz: "不用谢", py: "búyòng xiè", en: "no need to thank me", parts: [["búyòng","no need"],["xiè","thank"]] },
      { hz: "请", py: "qǐng", en: "please", tip: "Used when inviting or offering: please sit, please eat. Not tacked onto the end of a sentence like English “please”." },
      { hz: "请坐", py: "qǐng zuò", en: "please sit", parts: [["qǐng","please"],["zuò","sit"]] },
      { hz: "请进", py: "qǐng jìn", en: "please come in", parts: [["qǐng","please"],["jìn","enter"]] },
      { hz: "对不起", py: "duìbuqǐ", en: "sorry (I apologize)", tip: "A real apology — you did something wrong." },
      { hz: "不好意思", py: "bù hǎoyìsi", en: "excuse me / sorry to bother you", parts: [["bù","not"],["hǎoyìsi","comfortable"]],
        tip: "The everyday ‘sorry’: bumping into someone, getting attention, asking a favor. You'll hear this ten times a day." },
      { hz: "没关系", py: "méi guānxi", en: "it's OK / no problem", parts: [["méi","not have"],["guānxi","matter"]], tip: "The reply to duìbuqǐ." },
      { hz: "没事", py: "méi shì", en: "it's nothing / no worries", parts: [["méi","not have"],["shì","matter"]] },
      { hz: "麻烦你了", py: "máfan nǐ le", en: "sorry for the trouble / thanks for your help", parts: [["máfan","trouble"],["nǐ","you"],["le","(done)"]],
        tip: "Said after someone does you a favor. Very natural, very appreciated." },
    ],
    notes: [
      { title: "Why is it bú kèqi but bù hǎoyìsi?", body: "bù (not) changes to a rising bú when the next syllable is a falling 4th tone (kè). It's automatic in speech — just copy the sound you hear. The meaning never changes." },
    ] },

  // ------------------------------------------------------------------ 3
  { id: "howareyou", title: "How are you?", emoji: "😊",
    intro: "Small talk starts here. Chinese doesn't have “am/is/are” for describing yourself — you say “I very good”, “I very tired”. Once you know that shape you can describe any feeling.",
    phrases: [
      { hz: "你好吗", py: "nǐ hǎo ma?", en: "how are you?", parts: [["nǐ","you"],["hǎo","good"],["ma","?"]],
        tip: "Adding ma to the end turns any statement into a yes/no question." },
      { hz: "我很好", py: "wǒ hěn hǎo", en: "I'm good", parts: [["wǒ","I"],["hěn","very"],["hǎo","good"]] },
      { hz: "你呢", py: "nǐ ne?", en: "and you?", parts: [["nǐ","you"],["ne","and?"]], tip: "Bounce the question back. Works after any answer." },
      { hz: "还可以", py: "hái kěyǐ", en: "not bad / so-so", parts: [["hái","still"],["kěyǐ","OK"]] },
      { hz: "挺好的", py: "tǐng hǎo de", en: "pretty good", parts: [["tǐng","quite"],["hǎo","good"],["de","(softener)"]] },
      { hz: "最近怎么样", py: "zuìjìn zěnmeyàng?", en: "how have you been lately?", parts: [["zuìjìn","recently"],["zěnmeyàng","how is it"]],
        tip: "This is what people actually ask each other — more natural than nǐ hǎo ma." },
      { hz: "我很累", py: "wǒ hěn lèi", en: "I'm tired", parts: [["wǒ","I"],["hěn","very"],["lèi","tired"]] },
      { hz: "我很忙", py: "wǒ hěn máng", en: "I'm busy", parts: [["wǒ","I"],["hěn","very"],["máng","busy"]] },
      { hz: "我很高兴", py: "wǒ hěn gāoxìng", en: "I'm happy", parts: [["wǒ","I"],["hěn","very"],["gāoxìng","happy"]] },
      { hz: "我有点儿累", py: "wǒ yǒudiǎnr lèi", en: "I'm a little tired", parts: [["wǒ","I"],["yǒudiǎnr","a bit"],["lèi","tired"]] },
      { hz: "你累吗", py: "nǐ lèi ma?", en: "are you tired?", parts: [["nǐ","you"],["lèi","tired"],["ma","?"]] },
      { hz: "还好", py: "hái hǎo", en: "I'm alright / it's fine", parts: [["hái","still"],["hǎo","good"]] },
    ],
    notes: [
      { title: "The little word ma", body: "Put ma at the very end of a sentence and it becomes a question. nǐ hǎo (you're good) → nǐ hǎo ma? (are you good?). nǐ lèi (you're tired) → nǐ lèi ma? (are you tired?). No word-order changes ever." },
      { title: "hěn doesn't really mean “very”", body: "wǒ hěn hǎo sounds like “I'm VERY good”, but hěn is mostly filler here — it just makes the sentence feel complete. Without it (“wǒ hǎo”) sounds oddly unfinished. So the pattern for feelings is: wǒ + hěn + [feeling]." },
    ] },

  // ------------------------------------------------------------------ 4
  { id: "meeting", title: "Names & meeting people", emoji: "🤝",
    intro: "Introduce yourself, ask someone's name, and explain that you're learning. These phrases buy you a lot of goodwill — people love hearing a beginner try.",
    phrases: [
      { hz: "我叫布莱恩", py: "wǒ jiào Brian", en: "my name is Brian", parts: [["wǒ","I"],["jiào","am called"],["Brian","Brian"]] },
      { hz: "你叫什么名字", py: "nǐ jiào shénme míngzi?", en: "what's your name?", parts: [["nǐ","you"],["jiào","are called"],["shénme","what"],["míngzi","name"]],
        tip: "Question words like shénme (what) sit right where the answer would go — no need to move anything to the front." },
      { hz: "很高兴认识你", py: "hěn gāoxìng rènshi nǐ", en: "nice to meet you", parts: [["hěn","very"],["gāoxìng","happy"],["rènshi","to know"],["nǐ","you"]] },
      { hz: "我是美国人", py: "wǒ shì Měiguó rén", en: "I'm American", parts: [["wǒ","I"],["shì","am"],["Měiguó","America"],["rén","person"]],
        tip: "Nationality = country + rén (person). Zhōngguó rén = Chinese person." },
      { hz: "你是哪里人", py: "nǐ shì nǎlǐ rén?", en: "where are you from?", parts: [["nǐ","you"],["shì","are"],["nǎlǐ","where"],["rén","person"]] },
      { hz: "这是我朋友", py: "zhè shì wǒ péngyou", en: "this is my friend", parts: [["zhè","this"],["shì","is"],["wǒ","my"],["péngyou","friend"]] },
      { hz: "我学中文", py: "wǒ xué Zhōngwén", en: "I'm learning Chinese", parts: [["wǒ","I"],["xué","study"],["Zhōngwén","Chinese"]] },
      { hz: "我会说一点中文", py: "wǒ huì shuō yìdiǎn Zhōngwén", en: "I can speak a little Chinese", parts: [["wǒ","I"],["huì","can"],["shuō","speak"],["yìdiǎn","a little"],["Zhōngwén","Chinese"]] },
      { hz: "你说英文吗", py: "nǐ shuō Yīngwén ma?", en: "do you speak English?", parts: [["nǐ","you"],["shuō","speak"],["Yīngwén","English"],["ma","?"]] },
      { hz: "你多大", py: "nǐ duō dà?", en: "how old are you?", parts: [["nǐ","you"],["duō","how"],["dà","big"]], tip: "Literally “you how big”. Fine to ask in China — much less rude than in the US." },
      { hz: "朋友", py: "péngyou", en: "friend" },
      { hz: "老师", py: "lǎoshī", en: "teacher", tip: "Also a respectful way to address any knowledgeable person." },
    ],
    notes: [
      { title: "shì = am / is / are (all at once)", body: "Chinese verbs never change form. shì covers I am, you are, he is, they were. wǒ shì… (I am…), nǐ shì… (you are…), tā shì… (he/she is…). One word, done." },
      { title: "wǒ can mean “my” too", body: "For close relationships (friends, family) you can drop the possessive: wǒ péngyou = my friend, wǒ māma = my mom. The full form is wǒ de péngyou — more on de in the Family lesson." },
    ] },

  // ------------------------------------------------------------------ 5
  { id: "yesno", title: "Yes, no & simple questions", emoji: "❓",
    intro: "Surprise: Mandarin has no single word for “yes” or “no”. You answer by repeating the verb (“have” / “not have”, “want” / “not want”). This lesson gives you the handful of words that cover almost every yes/no in daily life.",
    phrases: [
      { hz: "对", py: "duì", en: "right / correct (yes)", tip: "The most common ‘yes’ in conversation. Someone says something true → duì." },
      { hz: "不对", py: "bú duì", en: "not right (no)", parts: [["bú","not"],["duì","right"]] },
      { hz: "是", py: "shì", en: "yes, it is", tip: "Answer to a shì question: nǐ shì Měiguó rén ma? → shì." },
      { hz: "不是", py: "bú shì", en: "no, it isn't", parts: [["bú","not"],["shì","is"]] },
      { hz: "好", py: "hǎo", en: "OK / sure", tip: "Yes to a suggestion: “Let's eat?” → hǎo!" },
      { hz: "不好", py: "bù hǎo", en: "not good / no", parts: [["bù","not"],["hǎo","good"]] },
      { hz: "有", py: "yǒu", en: "have / there is" },
      { hz: "没有", py: "méi yǒu", en: "don't have / there isn't", parts: [["méi","not"],["yǒu","have"]], tip: "yǒu is the one verb that takes méi instead of bù." },
      { hz: "要", py: "yào", en: "want" },
      { hz: "不要", py: "bú yào", en: "don't want / don't!", parts: [["bú","not"],["yào","want"]] },
      { hz: "可以", py: "kěyǐ", en: "can / may / that's fine" },
      { hz: "不可以", py: "bù kěyǐ", en: "not allowed / can't", parts: [["bù","not"],["kěyǐ","can"]] },
      { hz: "什么", py: "shénme", en: "what" },
      { hz: "为什么", py: "wèishénme", en: "why", parts: [["wèi","for"],["shénme","what"]] },
      { hz: "真的吗", py: "zhēn de ma?", en: "really?", parts: [["zhēn de","real"],["ma","?"]] },
    ],
    notes: [
      { title: "Answering yes/no: echo the verb", body: "nǐ yǒu ma? (do you have?) → yǒu / méi yǒu. nǐ yào ma? (do you want?) → yào / bú yào. kěyǐ ma? (is it OK?) → kěyǐ / bù kěyǐ. Find the verb in the question, say it back (with bù/méi in front for “no”)." },
      { title: "bù vs. méi", body: "Both mean “not”. bù is the default. méi is used with yǒu (have) and for things that didn't happen in the past: méi chī = didn't eat." },
    ] },

  // ------------------------------------------------------------------ 6
  { id: "numbers", title: "Numbers & counting", emoji: "🔢",
    intro: "Learn 1–10 and you can count to 99: eleven is “ten-one”, twenty is “two-ten”, twenty-five is “two-ten-five”. No new words needed.",
    phrases: [
      { hz: "一", py: "yī", en: "one" }, { hz: "二", py: "èr", en: "two" }, { hz: "三", py: "sān", en: "three" },
      { hz: "四", py: "sì", en: "four" }, { hz: "五", py: "wǔ", en: "five" }, { hz: "六", py: "liù", en: "six" },
      { hz: "七", py: "qī", en: "seven" }, { hz: "八", py: "bā", en: "eight" }, { hz: "九", py: "jiǔ", en: "nine" },
      { hz: "十", py: "shí", en: "ten" },
      { hz: "十一", py: "shíyī", en: "eleven", parts: [["shí","ten"],["yī","one"]] },
      { hz: "十五", py: "shíwǔ", en: "fifteen", parts: [["shí","ten"],["wǔ","five"]] },
      { hz: "二十", py: "èrshí", en: "twenty", parts: [["èr","two"],["shí","ten"]] },
      { hz: "二十五", py: "èrshíwǔ", en: "twenty-five", parts: [["èr","two"],["shí","ten"],["wǔ","five"]] },
      { hz: "一百", py: "yìbǎi", en: "one hundred", parts: [["yì","one"],["bǎi","hundred"]] },
      { hz: "两个", py: "liǎng ge", en: "two (of something)", parts: [["liǎng","two"],["ge","(counter)"]], tip: "When counting things, “two” becomes liǎng: liǎng ge rén = two people. èr is only for counting in sequence and in bigger numbers." },
      { hz: "三个", py: "sān ge", en: "three (of something)", parts: [["sān","three"],["ge","(counter)"]] },
      { hz: "几个", py: "jǐ ge?", en: "how many?", parts: [["jǐ","how many"],["ge","(counter)"]], tip: "For small numbers (under 10)." },
      { hz: "多少", py: "duōshǎo?", en: "how much / how many?", parts: [["duō","many"],["shǎo","few"]], tip: "For bigger numbers and prices." },
    ],
    notes: [
      { title: "The counter word ge", body: "Between a number and a thing, Chinese needs a counter word — like “two cups OF tea” in English. ge is the all-purpose one: sān ge péngyou (three friends), yí ge rén (one person). Use ge for everything at first; nobody will mind." },
      { title: "Say the tones on numbers", body: "sì (4, falling) vs. shí (10, rising) sound similar to a beginner. Tones matter here: get them mixed up and you might pay 40 instead of 10." },
    ] },

  // ------------------------------------------------------------------ 7
  { id: "food", title: "Food & drink basics", emoji: "🥟",
    intro: "The core food words. Chinese food vocabulary is very logical: meat is animal + ròu (meat), and drinks/dishes are mostly two-syllable words you'll hear at every meal.",
    phrases: [
      { hz: "吃", py: "chī", en: "eat" }, { hz: "喝", py: "hē", en: "drink" },
      { hz: "吃饭", py: "chī fàn", en: "eat a meal", parts: [["chī","eat"],["fàn","rice / meal"]], tip: "fàn means rice but also “a meal” — the two are the same idea." },
      { hz: "水", py: "shuǐ", en: "water" }, { hz: "茶", py: "chá", en: "tea" }, { hz: "咖啡", py: "kāfēi", en: "coffee" },
      { hz: "热水", py: "rè shuǐ", en: "hot water", parts: [["rè","hot"],["shuǐ","water"]], tip: "Hot water is the default drink in many Chinese homes. Ask for it and you'll fit right in." },
      { hz: "米饭", py: "mǐfàn", en: "cooked rice" }, { hz: "面条", py: "miàntiáo", en: "noodles" }, { hz: "饺子", py: "jiǎozi", en: "dumplings" },
      { hz: "汤", py: "tāng", en: "soup" }, { hz: "包子", py: "bāozi", en: "steamed buns" },
      { hz: "鸡肉", py: "jīròu", en: "chicken", parts: [["jī","chicken"],["ròu","meat"]] },
      { hz: "牛肉", py: "niúròu", en: "beef", parts: [["niú","cow"],["ròu","meat"]] },
      { hz: "猪肉", py: "zhūròu", en: "pork", parts: [["zhū","pig"],["ròu","meat"]] },
      { hz: "鱼", py: "yú", en: "fish" }, { hz: "蔬菜", py: "shūcài", en: "vegetables" }, { hz: "水果", py: "shuǐguǒ", en: "fruit" },
      { hz: "鸡蛋", py: "jīdàn", en: "egg", parts: [["jī","chicken"],["dàn","egg"]] },
      { hz: "菜", py: "cài", en: "a dish (of food)", tip: "Also means vegetables. Zhōngguó cài = Chinese food." },
    ],
    notes: [
      { title: "Build-a-word", body: "Lots of food words are two simple pieces: jī (chicken) + ròu (meat) = chicken; jī + dàn (egg) = egg; rè (hot) + shuǐ (water) = hot water. When you learn a piece, look for it in other words." },
    ] },

  // ------------------------------------------------------------------ 8
  { id: "table", title: "At the table", emoji: "🍽️",
    intro: "Family conversation happens over food. These are the phrases you'll hear and need at a meal: come eat, it's delicious, I'm full, cheers. There's some etiquette here too — hosts will push food on you, and a warm refusal is part of the ritual.",
    phrases: [
      { hz: "吃饭了", py: "chī fàn le!", en: "food's ready — come eat!", parts: [["chī","eat"],["fàn","meal"],["le","(now)"]] },
      { hz: "你吃了吗", py: "nǐ chī le ma?", en: "have you eaten?", parts: [["nǐ","you"],["chī","eat"],["le","(done)"],["ma","?"]],
        tip: "Often just a friendly greeting, like “how's it going?” — not always an invitation." },
      { hz: "吃了", py: "chī le", en: "I've eaten", parts: [["chī","eat"],["le","(done)"]] },
      { hz: "还没", py: "hái méi", en: "not yet", parts: [["hái","still"],["méi","not"]] },
      { hz: "我饿了", py: "wǒ è le", en: "I'm hungry", parts: [["wǒ","I"],["è","hungry"],["le","(now)"]] },
      { hz: "我渴了", py: "wǒ kě le", en: "I'm thirsty", parts: [["wǒ","I"],["kě","thirsty"],["le","(now)"]] },
      { hz: "好吃", py: "hǎochī", en: "delicious (food)", parts: [["hǎo","good"],["chī","eat"]], tip: "Literally “good-eat”." },
      { hz: "好喝", py: "hǎohē", en: "delicious (drink)", parts: [["hǎo","good"],["hē","drink"]] },
      { hz: "很好吃", py: "hěn hǎochī!", en: "it's delicious!", parts: [["hěn","very"],["hǎochī","delicious"]], tip: "Say this early and often. It's the best compliment you can pay a cook." },
      { hz: "再吃一点", py: "zài chī yìdiǎn", en: "eat a little more", parts: [["zài","again"],["chī","eat"],["yìdiǎn","a little"]], tip: "What every host says. Expect it three times." },
      { hz: "我吃饱了", py: "wǒ chī bǎo le", en: "I'm full", parts: [["wǒ","I"],["chī","eat"],["bǎo","full"],["le","(done)"]] },
      { hz: "不用了，谢谢", py: "búyòng le, xièxie", en: "no more, thank you", parts: [["búyòng","no need"],["le","(now)"],["xièxie","thanks"]] },
      { hz: "干杯", py: "gānbēi!", en: "cheers!", parts: [["gān","dry"],["bēi","cup"]], tip: "Literally “dry the cup” — traditionally you finish the drink." },
      { hz: "慢慢吃", py: "mànman chī", en: "enjoy your meal (take your time)", parts: [["mànman","slowly"],["chī","eat"]] },
      { hz: "太辣了", py: "tài là le", en: "too spicy!", parts: [["tài","too"],["là","spicy"],["le","!"]] },
      { hz: "太烫了", py: "tài tàng le", en: "too hot (temperature)!", parts: [["tài","too"],["tàng","scalding"],["le","!"]] },
    ],
    notes: [
      { title: "The little word le", body: "le at the end means something is done or has just changed: chī le = ate / have eaten; wǒ è le = I've become hungry; chī bǎo le = have eaten full. Don't overthink it — copy the phrases as wholes." },
      { title: "tài … le = too …", body: "Wrap any describing word in tài … le: tài là le (too spicy), tài guì le (too expensive), tài hǎo le (great!). It's one of the most useful patterns in the language." },
    ] },

  // ------------------------------------------------------------------ 9
  { id: "ordering", title: "Ordering & paying", emoji: "🧾",
    intro: "Restaurants and shops. You need to point at things, say what you want, ask the price, and settle up. “wǒ yào” (I want) + pointing gets you 80% of the way.",
    phrases: [
      { hz: "菜单", py: "càidān", en: "menu" },
      { hz: "服务员", py: "fúwùyuán", en: "waiter / waitress", tip: "Say it out loud to call the server over — that's normal, not rude." },
      { hz: "我要这个", py: "wǒ yào zhè ge", en: "I'll have this one", parts: [["wǒ","I"],["yào","want"],["zhè ge","this one"]], tip: "Point at the menu. Works everywhere." },
      { hz: "我要一杯茶", py: "wǒ yào yì bēi chá", en: "I'd like a cup of tea", parts: [["wǒ","I"],["yào","want"],["yì","one"],["bēi","cup"],["chá","tea"]] },
      { hz: "我要两碗米饭", py: "wǒ yào liǎng wǎn mǐfàn", en: "two bowls of rice, please", parts: [["wǒ","I"],["yào","want"],["liǎng","two"],["wǎn","bowl"],["mǐfàn","rice"]] },
      { hz: "不要辣", py: "bú yào là", en: "not spicy, please", parts: [["bú","not"],["yào","want"],["là","spicy"]] },
      { hz: "有没有水", py: "yǒu méiyǒu shuǐ?", en: "do you have water?", parts: [["yǒu","have"],["méiyǒu","not have"],["shuǐ","water"]], tip: "yǒu méiyǒu = “have not-have?” — another way to ask a yes/no question." },
      { hz: "多少钱", py: "duōshǎo qián?", en: "how much is it?", parts: [["duōshǎo","how much"],["qián","money"]] },
      { hz: "三十块", py: "sānshí kuài", en: "thirty (dollars / yuan)", parts: [["sānshí","thirty"],["kuài","(money unit)"]] },
      { hz: "太贵了", py: "tài guì le", en: "too expensive!", parts: [["tài","too"],["guì","expensive"],["le","!"]] },
      { hz: "便宜一点", py: "piányi yìdiǎn", en: "a little cheaper?", parts: [["piányi","cheap"],["yìdiǎn","a little"]] },
      { hz: "买单", py: "mǎidān", en: "the check, please" },
      { hz: "我请客", py: "wǒ qǐngkè", en: "my treat", parts: [["wǒ","I"],["qǐngkè","treat guests"]], tip: "Expect a friendly fight over the bill. This is how you enter it." },
      { hz: "好的", py: "hǎo de", en: "OK, sure", parts: [["hǎo","good"],["de","(done)"]] },
      { hz: "打包", py: "dǎbāo", en: "to-go / box it up" },
    ],
    notes: [
      { title: "Counting things: number + counter + thing", body: "yì bēi chá (one cup tea), liǎng wǎn fàn (two bowl rice), sān ge rén (three [ge] people). The counter goes in the middle every time. bēi = cup, wǎn = bowl, ge = everything else." },
      { title: "Money: kuài", body: "kuài is the spoken word for the basic unit of money (yuan in China, dollar in the US). sān kuài = 3 bucks, èrshí kuài = 20 bucks." },
    ] },

  // ------------------------------------------------------------------ 10
  { id: "understand", title: "I don't understand", emoji: "🆘",
    intro: "Your rescue kit. Every real conversation will run past what you know — these phrases keep it going instead of ending it. Learn them cold; they're the ones you'll use most in the first year.",
    phrases: [
      { hz: "我听不懂", py: "wǒ tīng bù dǒng", en: "I don't understand (what I heard)", parts: [["wǒ","I"],["tīng","hear"],["bù","not"],["dǒng","understand"]] },
      { hz: "我不知道", py: "wǒ bù zhīdào", en: "I don't know", parts: [["wǒ","I"],["bù","not"],["zhīdào","know"]] },
      { hz: "请再说一遍", py: "qǐng zài shuō yí biàn", en: "please say that again", parts: [["qǐng","please"],["zài","again"],["shuō","say"],["yí biàn","one time"]] },
      { hz: "慢一点", py: "màn yìdiǎn", en: "a bit slower", parts: [["màn","slow"],["yìdiǎn","a little"]] },
      { hz: "请说慢一点", py: "qǐng shuō màn yìdiǎn", en: "please speak more slowly", parts: [["qǐng","please"],["shuō","speak"],["màn","slow"],["yìdiǎn","a little"]] },
      { hz: "这个怎么说", py: "zhè ge zěnme shuō?", en: "how do you say this?", parts: [["zhè ge","this"],["zěnme","how"],["shuō","say"]], tip: "Point at something and ask. Instant vocabulary." },
      { hz: "什么意思", py: "shénme yìsi?", en: "what does that mean?", parts: [["shénme","what"],["yìsi","meaning"]] },
      { hz: "我明白了", py: "wǒ míngbai le", en: "I understand / got it", parts: [["wǒ","I"],["míngbai","understand"],["le","(now)"]] },
      { hz: "我的中文不好", py: "wǒ de Zhōngwén bù hǎo", en: "my Chinese isn't good", parts: [["wǒ de","my"],["Zhōngwén","Chinese"],["bù","not"],["hǎo","good"]], tip: "Everyone will say “no no, it's great!” — that's the ritual." },
      { hz: "没问题", py: "méi wèntí", en: "no problem", parts: [["méi","not have"],["wèntí","problem"]] },
      { hz: "等一下", py: "děng yíxià", en: "wait a moment", parts: [["děng","wait"],["yíxià","a moment"]] },
      { hz: "对，对，对", py: "duì duì duì", en: "yes yes yes (I'm following)", tip: "What listeners say to show they're with you. Nod along with it." },
    ],
    notes: [
      { title: "Why yī changes its tone", body: "The number one (yī) is a chameleon: yí before a 4th tone (yí biàn, yíxià), yì before the others (yìdiǎn, yì bēi). Same word, same meaning — the app writes what you'll actually hear." },
      { title: "tīng bù dǒng, tīng de dǒng", body: "tīng bù dǒng = hear-not-understand (I can't understand it). Swap bù for de and you get tīng de dǒng = I CAN understand. Same trick: kàn bù dǒng = can't read it." },
    ] },

  // ------------------------------------------------------------------ 11
  { id: "time", title: "Today, tomorrow & time", emoji: "🕒",
    intro: "Making plans. Mandarin time words are wonderfully regular: days of the week are “week-one, week-two…”, and instead of verb tenses you just add a time word — “I tomorrow eat dumplings”.",
    phrases: [
      { hz: "今天", py: "jīntiān", en: "today", parts: [["jīn","this"],["tiān","day"]] },
      { hz: "明天", py: "míngtiān", en: "tomorrow", parts: [["míng","next"],["tiān","day"]] },
      { hz: "昨天", py: "zuótiān", en: "yesterday", parts: [["zuó","last"],["tiān","day"]] },
      { hz: "现在", py: "xiànzài", en: "now" },
      { hz: "早上", py: "zǎoshang", en: "morning" }, { hz: "中午", py: "zhōngwǔ", en: "noon" }, { hz: "晚上", py: "wǎnshang", en: "evening" },
      { hz: "几点", py: "jǐ diǎn?", en: "what time is it?", parts: [["jǐ","how many"],["diǎn","o'clock"]] },
      { hz: "三点", py: "sān diǎn", en: "three o'clock", parts: [["sān","three"],["diǎn","o'clock"]] },
      { hz: "六点半", py: "liù diǎn bàn", en: "half past six", parts: [["liù","six"],["diǎn","o'clock"],["bàn","half"]] },
      { hz: "星期一", py: "xīngqīyī", en: "Monday", parts: [["xīngqī","week"],["yī","one"]] },
      { hz: "星期五", py: "xīngqīwǔ", en: "Friday", parts: [["xīngqī","week"],["wǔ","five"]] },
      { hz: "星期天", py: "xīngqītiān", en: "Sunday", parts: [["xīngqī","week"],["tiān","day"]], tip: "The odd one out — Sunday is “week-day”, not “week-seven”." },
      { hz: "周末", py: "zhōumò", en: "weekend" },
      { hz: "每天", py: "měitiān", en: "every day", parts: [["měi","every"],["tiān","day"]] },
      { hz: "我明天来", py: "wǒ míngtiān lái", en: "I'll come tomorrow", parts: [["wǒ","I"],["míngtiān","tomorrow"],["lái","come"]] },
      { hz: "我们几点吃饭", py: "wǒmen jǐ diǎn chī fàn?", en: "what time are we eating?", parts: [["wǒmen","we"],["jǐ diǎn","what time"],["chī fàn","eat"]] },
    ],
    notes: [
      { title: "No tenses — just time words", body: "wǒ chī jiǎozi = I eat dumplings. wǒ míngtiān chī jiǎozi = I'll eat dumplings tomorrow. wǒ zuótiān chī jiǎozi = I ate dumplings yesterday. The verb never changes; the time word goes after the subject, before the verb." },
      { title: "Days of the week", body: "xīngqī (week) + number: xīngqīyī Monday, xīngqī'èr Tuesday, xīngqīsān Wednesday … xīngqīliù Saturday. Sunday is xīngqītiān." },
    ] },

  // ------------------------------------------------------------------ 12
  { id: "family", title: "Family", emoji: "👨‍👩‍👧",
    intro: "Family words are precise in Chinese: there's no plain “brother” — it's always older brother or younger brother — and grandparents have different names depending on whose parents they are. This is worth learning carefully because it's how relatives will introduce themselves to you.",
    phrases: [
      { hz: "家", py: "jiā", en: "home / family" },
      { hz: "家人", py: "jiārén", en: "family members", parts: [["jiā","family"],["rén","person"]] },
      { hz: "爸爸", py: "bàba", en: "dad" }, { hz: "妈妈", py: "māma", en: "mom" },
      { hz: "哥哥", py: "gēge", en: "older brother" }, { hz: "弟弟", py: "dìdi", en: "younger brother" },
      { hz: "姐姐", py: "jiějie", en: "older sister" }, { hz: "妹妹", py: "mèimei", en: "younger sister" },
      { hz: "爷爷", py: "yéye", en: "grandpa (dad's father)" }, { hz: "奶奶", py: "nǎinai", en: "grandma (dad's mother)" },
      { hz: "外公", py: "wàigōng", en: "grandpa (mom's father)" }, { hz: "外婆", py: "wàipó", en: "grandma (mom's mother)" },
      { hz: "老公", py: "lǎogōng", en: "husband (casual)" }, { hz: "老婆", py: "lǎopo", en: "wife (casual)" },
      { hz: "孩子", py: "háizi", en: "child / kids" },
      { hz: "儿子", py: "érzi", en: "son" }, { hz: "女儿", py: "nǚ'ér", en: "daughter" },
      { hz: "我的家人", py: "wǒ de jiārén", en: "my family", parts: [["wǒ","I"],["de","'s"],["jiārén","family"]] },
      { hz: "这是我妈妈", py: "zhè shì wǒ māma", en: "this is my mom", parts: [["zhè","this"],["shì","is"],["wǒ","my"],["māma","mom"]] },
      { hz: "你有孩子吗", py: "nǐ yǒu háizi ma?", en: "do you have kids?", parts: [["nǐ","you"],["yǒu","have"],["háizi","kids"],["ma","?"]] },
      { hz: "我有两个孩子", py: "wǒ yǒu liǎng ge háizi", en: "I have two kids", parts: [["wǒ","I"],["yǒu","have"],["liǎng","two"],["ge","(counter)"],["háizi","kids"]] },
      { hz: "她是我姐姐", py: "tā shì wǒ jiějie", en: "she is my older sister", parts: [["tā","she"],["shì","is"],["wǒ","my"],["jiějie","older sister"]] },
    ],
    notes: [
      { title: "de = 's / “of”", body: "de links an owner to a thing: wǒ de (my), nǐ de (your), tā de (his/her). wǒ de shuǐ = my water. For close family and friends the de is usually dropped: wǒ māma, wǒ péngyou." },
      { title: "Doubled syllables", body: "Family words repeat: bàba, māma, gēge, jiějie. The second half is soft, quick and toneless — say it like an afterthought." },
    ] },

  // ------------------------------------------------------------------ 13
  { id: "wants", title: "Wanting, liking & needing", emoji: "💛",
    intro: "Express preferences. Two words for “want” — yào (I want it, decisive) and xiǎng (I'd like to, softer) — plus like, don't like, need, and the wonderful all-purpose “whatever's fine”.",
    phrases: [
      { hz: "我要", py: "wǒ yào…", en: "I want…", parts: [["wǒ","I"],["yào","want"]], tip: "Direct. Good for ordering: wǒ yào chá." },
      { hz: "我想", py: "wǒ xiǎng…", en: "I'd like to… / I think…", parts: [["wǒ","I"],["xiǎng","would like"]], tip: "Softer than yào. Usually followed by an action: wǒ xiǎng chī… (I'd like to eat…)." },
      { hz: "我想吃饺子", py: "wǒ xiǎng chī jiǎozi", en: "I'd like to eat dumplings", parts: [["wǒ","I"],["xiǎng","would like"],["chī","eat"],["jiǎozi","dumplings"]] },
      { hz: "我喜欢", py: "wǒ xǐhuan…", en: "I like…", parts: [["wǒ","I"],["xǐhuan","like"]] },
      { hz: "我不喜欢", py: "wǒ bù xǐhuan…", en: "I don't like…", parts: [["wǒ","I"],["bù","not"],["xǐhuan","like"]] },
      { hz: "我喜欢喝茶", py: "wǒ xǐhuan hē chá", en: "I like drinking tea", parts: [["wǒ","I"],["xǐhuan","like"],["hē","drink"],["chá","tea"]] },
      { hz: "你喜欢吗", py: "nǐ xǐhuan ma?", en: "do you like it?", parts: [["nǐ","you"],["xǐhuan","like"],["ma","?"]] },
      { hz: "我需要", py: "wǒ xūyào…", en: "I need…", parts: [["wǒ","I"],["xūyào","need"]] },
      { hz: "你要什么", py: "nǐ yào shénme?", en: "what do you want?", parts: [["nǐ","you"],["yào","want"],["shénme","what"]] },
      { hz: "都可以", py: "dōu kěyǐ", en: "anything's fine", parts: [["dōu","all"],["kěyǐ","OK"]] },
      { hz: "随便", py: "suíbiàn", en: "whatever / up to you", tip: "The classic answer to “what do you want to eat?” Sometimes frustrating, always polite." },
      { hz: "我也是", py: "wǒ yě shì", en: "me too", parts: [["wǒ","I"],["yě","also"],["shì","am"]] },
      { hz: "太好了", py: "tài hǎo le!", en: "great! / wonderful!", parts: [["tài","too"],["hǎo","good"],["le","!"]] },
      { hz: "我很喜欢", py: "wǒ hěn xǐhuan", en: "I really like it", parts: [["wǒ","I"],["hěn","very"],["xǐhuan","like"]] },
    ],
    notes: [
      { title: "yào vs. xiǎng", body: "yào = want (a thing, firmly): wǒ yào shuǐ. xiǎng = would like to (do something): wǒ xiǎng hē shuǐ. When ordering, yào. When making a wish or suggestion, xiǎng. Both are safe — nobody will be offended either way." },
      { title: "Sentence order = English order", body: "Subject – verb – object, same as English: wǒ (I) xǐhuan (like) chá (tea). Add bù before the verb for “don't”: wǒ bù xǐhuan chá." },
    ] },

  // ------------------------------------------------------------------ 14
  { id: "where", title: "This, that & where", emoji: "📍",
    intro: "Pointing words and pronouns. With zhè (this), nà (that), nǎ (which/where) plus “I / you / he / we / they” you can talk about anything you can point at.",
    phrases: [
      { hz: "这个", py: "zhè ge", en: "this one" }, { hz: "那个", py: "nà ge", en: "that one" }, { hz: "哪个", py: "nǎ ge?", en: "which one?" },
      { hz: "这里", py: "zhèlǐ", en: "here" }, { hz: "那里", py: "nàlǐ", en: "there" }, { hz: "哪里", py: "nǎlǐ?", en: "where?" },
      { hz: "在哪里", py: "zài nǎlǐ?", en: "where is…?", parts: [["zài","at"],["nǎlǐ","where"]], tip: "Put the thing first: [thing] zài nǎlǐ?" },
      { hz: "厕所在哪里", py: "cèsuǒ zài nǎlǐ?", en: "where's the bathroom?", parts: [["cèsuǒ","toilet"],["zài","at"],["nǎlǐ","where"]] },
      { hz: "在这里", py: "zài zhèlǐ", en: "it's here", parts: [["zài","at"],["zhèlǐ","here"]] },
      { hz: "这是什么", py: "zhè shì shénme?", en: "what is this?", parts: [["zhè","this"],["shì","is"],["shénme","what"]] },
      { hz: "我", py: "wǒ", en: "I / me" }, { hz: "你", py: "nǐ", en: "you" },
      { hz: "他", py: "tā", en: "he / him", tip: "“she” is also tā — same sound. Only the writing differs, and you're not writing." },
      { hz: "我们", py: "wǒmen", en: "we / us", parts: [["wǒ","I"],["men","(plural)"]] },
      { hz: "你们", py: "nǐmen", en: "you all", parts: [["nǐ","you"],["men","(plural)"]] },
      { hz: "他们", py: "tāmen", en: "they / them", parts: [["tā","he/she"],["men","(plural)"]] },
      { hz: "谁", py: "shéi?", en: "who?" },
      { hz: "我们走吧", py: "wǒmen zǒu ba", en: "let's go", parts: [["wǒmen","we"],["zǒu","go"],["ba","(let's)"]], tip: "ba at the end softens a sentence into a suggestion." },
    ],
    notes: [
      { title: "zhè / nà / nǎ", body: "Three sounds, one pattern: zhè = this, nà = that, nǎ = which. Add ge for “this one / that one / which one”; add lǐ for “here / there / where”." },
      { title: "Plurals with men", body: "wǒ (I) → wǒmen (we). nǐ (you) → nǐmen (you all). tā (he/she) → tāmen (they). Only for people — things don't get a plural at all." },
    ] },
];

// Bonus phrasebook category (not a lesson): little words that glue sentences together.
const CONNECTORS = { cat: "Connectors & glue words", icon: "🔗", words: [
  { hz: "和", py: "hé", en: "and" }, { hz: "也", py: "yě", en: "also" }, { hz: "可是", py: "kěshì", en: "but" },
  { hz: "因为", py: "yīnwèi", en: "because" }, { hz: "所以", py: "suǒyǐ", en: "so / therefore" },
  { hz: "然后", py: "ránhòu", en: "then / after that" }, { hz: "以后", py: "yǐhòu", en: "later / afterwards" },
  { hz: "还", py: "hái", en: "still / in addition" }, { hz: "都", py: "dōu", en: "all / both" },
  { hz: "很", py: "hěn", en: "very" }, { hz: "一点", py: "yìdiǎn", en: "a little" },
  { hz: "非常", py: "fēicháng", en: "extremely" }, { hz: "一起", py: "yìqǐ", en: "together" },
  { hz: "或者", py: "huòzhě", en: "or" }, { hz: "如果", py: "rúguǒ", en: "if" },
]};

// Phrasebook view = one category per lesson + connectors.
const VOCAB = LESSONS.map(l => ({ cat: l.title, icon: l.emoji, words: l.phrases, lessonId: l.id })).concat([CONNECTORS]);

if (typeof module !== "undefined") module.exports = { LESSONS, CONNECTORS, VOCAB };
