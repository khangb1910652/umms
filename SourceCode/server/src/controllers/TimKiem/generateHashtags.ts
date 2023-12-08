function removeVietnameseDiacritics(text: any) {
    return text
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
}

export function generateHashtags(text: any) {
    const words = text.split(' ');

    const hashtags = words.map((word: any) => {
        const trimmedWord = word.trim();
        if (trimmedWord.length > 0) {
            const wordWithoutDiacritics = removeVietnameseDiacritics(trimmedWord);
            if (trimmedWord === wordWithoutDiacritics) {
                return `#${trimmedWord.replace(/\s/g, '')}`;
            }
            return `#${wordWithoutDiacritics.replace(/\s/g, '')} #${trimmedWord.replace(/\s/g, '')}`;
        }
        return '';
    });

    return hashtags.filter((hashtag: any) => hashtag.length > 0);
}
        // const nlp = require('compromise');
        // function generateHashtags(text: any) {
        //   const doc = nlp(text);
        //   const nouns = doc.nouns().out('array');
        //   const words = text.split(' ');
        //   let hashtags: any[] = [];
        //   hashtags = hashtags.concat(
        //     nouns.map((noun: any) => {
        //       const trimmedNoun = noun.trim();
        //       if (trimmedNoun.length > 0) {
        //         return `#${trimmedNoun.replace(/\s/g, '')}`;
        //       }
        //       return '';
        //     })
        //   );
        //   hashtags = hashtags.concat(
        //     words.map((word: any) => {
        //       const trimmedWord = word.trim();
        //       if (trimmedWord.length > 0) {
        //         return `#${trimmedWord.replace(/\s/g, '')}`;
        //       }
        //       return '';
        //     })
        //   );
        //   return hashtags.filter((hashtag: any) => hashtag.length > 0);
        // }