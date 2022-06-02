export interface EmojiList {
    [key:string]: string,
}

export interface Emoji {
    key:string,
    image: string,
}

export const emojiList:EmojiList = {
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
    chicken: 'DancingChicken.gif',
    chug: 'chug.gif',
    clapping: '41.gif',
    cool: 'cool.gif',
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
    kc: 'kc.gif',
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

export const emojiArray:Emoji[] = Object.keys(emojiList).map(key => ({key, image: emojiList[key]}));


/*
progulus@li680-178:~/www/progulus.com/rprweb/images/smilies$ ls
11.gif                   beerbang.gif     cm.gif               drool.gif                           frog.gif       hal.gif           keys.gif                      nono.gif          qr2.gif                                          so.gif          tongue.gif    yes-anim-2.gif
24.gif                   bigblueeyes.gif  coffee.gif           drummer.gif                         frost.gif      hammers2.gif      king.gif                      note.gif          qr.gif                                           sp01.gif        trash.gif     yes.gif
39.gif                   biggrin.gif      cookiemonster.gif    drunk.gif                           fsm.gif        headbang2.gif     kiss.gif                      notes.gif         robots.txt                                       sp02.gif        tull.png      yikes.gif
41.gif                   blush.gif        cookie_warning1.jpg  dt.gif                              genesis.gif    _headbanger.gif   kma.gif                       notlistening.gif  rush.gif                                         sp03.gif        _turnup.gif   yin-yang.gif
468x60_bnn_progulus.gif  boner.gif        cool.gif             eloy.gif                            gg-smiley.png  headbang.gif      laugh.gif                     o.gif             sad.gif                                          sp04.gif        uhh.gif       z-coffee.gif
4.gif                    borgsmile.gif    cowbell.gif          elp.gif                             giant.gif      headphones.gif    lick.gif                      operator.gif      santa.gif                                        squonk_d2.jpg   viking.gif    zombie.gif
59.gif                   bouncy.gif       crazy.gif            Emo_37.gif                          glomp.gif      headscratch.gif   lighter.gif                   os-rush.gif       sasmokin.gif                                     squonk.jpg      violin.gif    zzz.gif
63.gif                   bowdown.gif      cry.gif              evilrocker.gif                      goggly.gif     idea.gif          loco.gif                      partyman.gif      sax.gif                                          symx.gif        wacko.gif
artist.gif               bowl.gif         dance.png            eyeball.gif                         grail.png      IMG_0326.jpg      loud.gif                      pb-logo.gif       ship_sm.gif                                      symxmask.gif    wallbash.gif
asia-st.gif              bowling.gif      DancingChicken.gif   eye-popping.gif                     greyhappy.gif  index.php         LP_Drummer_smiley_by_Hp1.gif  peace2.gif        _shithappens_or__poo__revision_by_Mrichston.gif  tarkus.gif      washing2.gif
atrox.gif                camel.gif        deathbang.gif        _fastguitar__by_Chimpantalones.gif  grphug.gif     jester.gif        ltelogo.gif                   peace.gif         shocked.gif                                      tfk.png         washing.gif
ayreon.gif               camel_logo.gif   default.css          favicon.ico                         grumble.gif    jumping_fish.gif  lurk.gif                      pig.gif           sick.gif                                         thankyou.gif    watcher.gif
bang.gif                 censored.gif     devin.gif            fireman.gif                         guitar1.gif    kamelot.gif       mad.gif                       pirate2.gif       singer.gif                                       Thumbs.db       wavey.gif
bass.gif                 cheese.gif       dizzy.gif            fistbump.gif                        guitar2.gif    kansas1.gif       moomin.gif                    pirate3.gif       _smack_.gif                                      thumbsdown.gif  wink.gif
bawl1.gif                chew.gif         doh.gif              flash.gif                           guitar3.gif    kc.gif            moominpappa.gif               pirate.gif        sm_cowbell.png                                   tired.gif       woohoo.gif
beatnik.gif              chug.gif         drink.gif            flute.gif                           guitar.gif     keybang.gif       mus01.gif                     pukeface.gif      smile.gif                                        tongue2.gif     yes2_sm.gif
 */
