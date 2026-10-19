---
title: “Any Advice on Building a Crypto Wallet?” “Don’t.”
date: '2026-10-19'
description: "A stranger on Telegram asked me for advice on the crypto wallet he had been vibecoding for eight months. I said don’t. He shipped it anyway, so I helped him rebuild it."
---

After months of rebuilding, SelvWallet goes into beta this week. Late last year, it was three messages in my Telegram from a number I didn't know:

> Yo bro  
> I got u from rogers bro  
> need help and he also told me to tell u when the FUCK Are you guys getting a bear togeher

A mutual friend vouching for me, a request for help, and an all-caps demand that we finally get a "bear" together. Of course I responded.

Dexter was building a crypto wallet. Not planning one. He had been building it, locally, for eight months:

> fucking tierd of trying  
> but i cant fucking quit now ive beebn fucking building it localy for 8 month

He also volunteered his experience level.

> im not like working with codes and shit , im just doing it on my freetime like "vibecoding"

The wallet he had built was custodial, meaning his code would hold the keys and everyone's money. Having helped build a custodial wallet before (Vidy's), I gave him the honest advice: "don't." That was the entirety of my initial answer. Given the eight months, I softened it: don't build a *custodial* one. The correctness expected of systems that hold other people's money is easy to underestimate, and then there is the relentless "volunteer testing" carried out by hordes of bad actors who emerge from the darker corners of the internet. Keep it self-custodial and you're building a way for people to manage their own money, without taking custody of it yourself.

The pivot itself he took without argument. The timeline was what stung: I figured someone who had built one before could ship the self-custodial version in four to eight weeks. He did the math out loud:

> fucking hell and i spent 8 months on that shit

"Well," I told him, "you spent eight months learning about it."

I forget what I was supposed to be doing instead, but I kept going. Opinions, architecture, the decisions I felt strongly about. He was receptive to all of it, so I rambled. A lot. Toward the end I realized it was a bit sadistic to expect anybody to sift through my ramblings, especially when I could shorthand the whole roadmap to an LLM and let it expand. "So this is half me half AI," I told him, and handed over a playbook for the entire project. He said thanks, called me a legend, and I assumed that was that. I honestly thought I'd never hear anything else about it.

Shows what I know. Two months later, almost to the day:

> so the wallet is up and running  
> at tg

I think I ignored it, swamped at the time, which is on me. He pinged "checked it out?" twice in February and once more at the end of March. What finally got me to look was the wallet coming up in a group chat, from somebody who wasn't him. Other people knew about the thing I had allegedly helped start, and I still hadn't seen it.

I looked, and I have to be honest about what I found: it was real. A working wallet, live on Telegram, with an interface he had willed into existence one prompt at a time. Strangers had trusted it with actual money. He reported the fees it had earned, thirty-one dollars, the way you'd report a lottery win.

> putted my soul in it hehe

You could tell.

That same night, close to two in the morning, he asked the question that made up my mind:

> how can i show people that the wallet actually are safe  
> how do i get it audit?

That is the right question. Plenty of people who write software for a living never think to ask it. An independent security audit was beyond his budget, so he invited me into the repo to see what I could find. He'd been fearless about that from the first night, too:

> so ill send the blueprints i got now and u can tell me exactly how fucking terible coder i am haha

Dexter has grit and ambition, traits I wish I saw more of in others. He wasn't afraid to bite off way more than most people would think they could chew. When he said he wanted to build a wallet, the people he told, myself included, gave him some version of "don't." He did it anyway. Timing was on his side too, because a lot of the skills he needed were becoming more accessible thanks to AI. Sure, he still needed a lot of help with the engineering, but he reminded me: you can just do things.

What followed was months of the least glamorous work in software. I went through that codebase the way I'd want somebody to go through code holding my money. We fixed real problems, then fixed the fixes. I ended up replacing most of it. He cared more about getting it right than holding on to work he'd spent months on.

The first real work we did together was two days of housekeeping: setting up proper key management, writing deploy scripts. Not the fun part of running a wallet, and he showed up for all of it. The work moved the way hobby projects move: nothing for weeks while jobs and lives happened, then weekend-long sprints.

We haven't had an independent security audit yet. I've spoken with an auditor from our community who might be willing to work with us on it, but nothing is confirmed. Point is, my work on the codebase isn't a substitute for an independent review.

Somewhere in there, the wallet got a new name: SelvWallet. Selv is "self" in his native language. The first advice I ever gave him was to keep it self-custodial, and now the product is named after the lesson.

My first answer was "don't." Less than a year later, we're opening up the beta. Not bad for a guy who's "not like working with codes and shit."

Check it out at [SelvWallet](https://selvwallet.com).
