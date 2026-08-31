---
title: "Yo, Should I Rebase Main?"
date: '2026-08-31'
description: "My friend kept asking to rebase main when he meant pull, so I built him an animated git site where commits are blocks that never move."
cardImage: /img/blog/gitblocks-rebase.png
cardLabel: gitblocks · rebase, mid-replay
cardText: Commits are blocks that never move. My friend needed the picture, so I built it.
---

“Yo, should I rebase main?”

I get that message several times a day, at random, from a friend I build a hobby project with. We are the only two developers on it, so 90% of the time there's no divergent branch in sight. It’s his way of asking, “Are there changes I should pull and test?”

<iframe src="https://git.redstone.university/rebase?embed&loop" width="100%" height="470" style="border:1px solid #d9d4c8;border-radius:10px;background:#EFE7D2" title="git rebase, playing itself" loading="eager"></iframe>

*`git rebase`, playing itself. We’ll get there.*

He wasn’t a developer until recently, and how the two of us ended up on a project together is an epic story for another post. The part that matters here: he ships working software to a handful of his own projects daily, and the git verbs are just borrowed incantations to him. English isn’t his native language either, so I already go out of my way to be annoying and correct word hiccups, and “rebase main” got the same treatment as any other vocabulary slip. By the fifth correction, I started questioning my own ability to teach these concepts.

So I turned to the thing that has been explaining git for years, the official documentation. Expecting the result of two decades of revisions and improvements, I read the rebase definition out loud: “Reapply commits on top of another base tip.” The majority of the words in that sentence are other git words. Looking for a save, I moved on to the description, whose first sentence defines rebase in terms of git switch. A little further down, the manual suggests you can use rebase “to pretend that you forked the topic branch.”

You can chase entries in a circle all afternoon like this. This is also the software that officially calls its user-facing commands the “porcelain,” as in the part of the toilet you’re meant to touch, and its internals the “plumbing.” I did not make that up, nor did I send him the official documentation.

The thing that fixed this exact problem for a different technology was [RxMarbles](https://rxmarbles.com), a genius little site by [André Staltz](https://github.com/staltz) that taught Rx operators by letting you drag marbles along timelines and watch how `switchMap` or `withLatestFrom` actually shaped the output. No descriptions, hell not many words at all for that matter. Just clear visualizations for each operator you could grab ahold of. Rx is at least as hostile as git, and that site made it click for a whole generation of frontend people.

I was convinced I just had to find GitMarbles and link him the rebase animation the next time he asked. Git, apparently, doesn’t have marbles. Sorry, horrible joke. There are git visualizers, but none of them felt right: too verbose, too spread out, the diagrams mixed into walls of the same words that weren’t working in the first place. I wasn’t going to settle for anything less immediate than RxMarbles.

I built it myself instead, on one law: a commit is a block (the Minecraft kind, not the chain kind), and blocks never move. Commits don’t either. A commit’s id is a hash of everything in it, parents included, so git can never relocate one, only write new ones. The blocks obey the same physics as the data structure.

Branches are name tags floating above the blocks. When a change travels from one block to another, it rides a little torch across the gap. That’s the whole visual language.

The law does the teaching, because once blocks can’t move, there is no way to animate a git command dishonestly. Rebase can’t slide your commits onto main. It has to build copies, new blocks with new IDs, while the originals ghost out behind you. Reset can’t rewind anything. It has to show a branch walking backwards away from blocks that are still standing there. Merge is one new block with two parent wires.

Three more marks finish the set: a dashed outline is a block about to exist, a pulsing halo is a block the current command has plans for, and a ghost is a block no name can reach anymore.

The look is stolen… from myself. I’ve been building [redstone.university](https://redstone.university), a computer science course rendered out of Minecraft, and over time it has established a complete visual system: paper and ink, pastel block families, redstone-dust-colored lines for the wires ([the pipeline behind it has its own post](/blog/almost-killed-redstone-university)). I lifted it wholesale, and the terminal wears [Human++](https://github.com/fielding/human-plus-plus), my own color scheme, on warm charcoal. Borrowing a finished visual language is most of the reason the whole site shipped in a few hours.

About a dozen animations in, I noticed I had built a filmstrip. You could watch rebase happen. I was pleased with the animations, but I thought about how I actually learned git, and I began to worry that watching preset commands alone wasn’t enough.

So the last page is a sandbox: a real terminal wired to the same visualization. You type actual git commands, including the aliases from my actual gitconfig (`g c -m "..."` works, because otherwise testing it was embarrassing even with nobody watching), and the graph animates every one of them. Underneath is a small deterministic git: branch, switch, merge, rebase, `--onto`, cherry-pick, reset, revert, plus a simulated origin you can fetch from, push to, and force-push over while a fake teammate quietly makes you regret it. Forty branches is allowed, the camera just zooms out. There are no files in it, so merges never conflict, and the terminal says so up front.

Every guided page plays itself on a loop like an arcade cabinet waiting for a quarter, and the presets type into the same terminal you do. Touch anything and the loop stops and the session is yours.

My favorite command in there isn’t from git at all. Type `share` and you get a URL with your whole session encoded in it. Whoever opens the link watches your session replay from scratch, every command typed out character by character, on a loop, until they press a key. Then it’s theirs.

<iframe src="https://git.redstone.university/playground?s=WyJnaXQgcmVtb3RlIGFkZCBvcmlnaW4iLCJnaXQgY29tbWl0IC1tIFwiYWRkIGxvZ2luIGZvcm1cIiIsInRlYW1tYXRlIGNvbW1pdCAtbSBcImJ1bXAgZGVwc1wiIiwiZ2l0IGZldGNoIiwiZ2l0IHB1bGwgLS1yZWJhc2UiXQ&embed" width="100%" height="470" style="border:1px solid #d9d4c8;border-radius:10px;background:#EFE7D2" title="a shared sandbox session replaying itself" loading="lazy"></iframe>

*a shared session replaying itself: a teammate pushes while you have local commits, and `git pull --rebase` replays yours on top. It’s also the one time my friend’s question is accidentally the right one.*

Some honesty. The sandbox is real-enough git, a teaching model with no working tree, no index, no conflicts. With that said, learngitbranching still does something this site doesn’t: structured challenges with goals to hit. Different thesis, and I’d send someone to both.

All of this came with a surprise. I audited every quoted output and claim against real git behavior, and I lost some rounds. I had written that the reflog protects abandoned commits for about 90 days. For unreachable commits it’s 30 by default. I had quoted the famous “You are in ‘detached HEAD’ state” warning under `git switch --detach`, and that warning turns out to belong to `git checkout`. Switch just says `HEAD is now at b7a41d2` and trusts you knew what you asked for. The site had started teaching before it had any students.

The site is [git.redstone.university](https://git.redstone.university). The next time my friend inquires about rebasing main, I have a link waiting for him.

