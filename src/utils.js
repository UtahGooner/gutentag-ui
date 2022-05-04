import validator from "validator";

export const isValidURL = (url = '') => {
    return url === '' || validator.isEmail(url) || validator.isURL(url);
};


export const smilies = {
    11: '11.gif',
    artist: 'artist.gif',
    bang: 'bang.gif',
    bang2: 'guitar.gif',
    beatnik: 'beatnik.gif',
    beerbang: 'beerbang.gif',
    blue: 'bigblueeyes.gif',
    boner: 'boner.gif',
    borg: 'borgsmile.gif',
    bouncy: 'bouncy.gif',
    bow: 'bowdown.gif',
    censored: 'censored.gif',
    chug: 'chug.gif',
    clapping: '41.gif',
    coffee: 'coffee.gif',
    cookie: 'cookiemonster.gif',
    cowbell: 'sm_cowbell.png',
    dance: 'dance.png',
    death: 'deathbang.gif',
    devin: 'devin.gif',
    doh: 'doh.gif',
    drink: 'drink.gif',
    drool: 'drool.gif',
    drums: 'drummer.gif',
    drunk: 'drunk.gif',
    dt: 'dt.gif',
    eyepop: 'eye-popping.gif',
    evilrocker: 'evilrocker.gif',
    fish: 'jumping_fish.gif',
    flash: 'flash.gif',
    flute: 'flute.gif',
    fsm: 'fsm.gif',
    genesis: 'genesis.gif',
    gg: 'gg-smiley.png',
    glomp: 'glomp.gif',
    glompall: 'grphug.gif',
    goggly: 'goggly.gif',
    grail: 'grail.png',
    grumble: 'grumble.gif',
    guitar: 'guitar1.gif',
    hal: 'hal.gif',
    headbang: 'guitar3.gif',
    headbang2: 'headbang.gif',
    hmm: '39.gif',
    idea: 'idea.gif',
    keybang: 'keybang.gif',
    lighter: 'lighter.gif',
    lurk: 'lurk.gif',
    moomin: 'moomin.gif',
    nono: 'nono.gif',
    notlistening: 'notlistening.gif',
    phones: 'headphones.gif',
    pig: 'pig.gif',
    pirate: 'pirate3.gif',
    rofl: '24.gif',
    santa: 'santa.gif',
    sax: 'sax.gif',
    uhh: 'uhh.gif',
    watcher: 'watcher.gif',
    wave: 'wavey.gif',
    yarr: 'pirate2.gif',
    yes: 'yes-anim-2.gif',
    yes2: 'yes2_sm.gif',
};

export const smileyList = Object.keys(smilies).map(key => ({key, img: smilies[key]}));