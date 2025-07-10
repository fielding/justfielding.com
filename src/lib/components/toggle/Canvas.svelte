<script lang="ts">
	import { onMount } from 'svelte';
	import { tsParticles, type Container } from '@tsparticles/engine';
	import { loadAll } from '@tsparticles/all';

	export let on: boolean;

	let canvasEl: HTMLCanvasElement;
	let particles: Container | undefined;

	const configs = {
		name: 'Fireworks Mask',
		fullScreen: {
			enable: true
		},
		background: {
			color: '#000000',
			image: "url('https://i.imgur.com/pBrcDlV.png')",
			position: '50% 50%',
			repeat: 'no-repeat',
			size: 'cover'
		},
		backgroundMask: {
			enable: true,
			cover: {
				color: '#000'
			}
		},
		emitters: {
			direction: 'top',
			life: {
				count: 0,
				duration: 0.1,
				delay: 0.1
			},
			rate: {
				delay: 0.15,
				quantity: 1
			},
			size: {
				width: 100,
				height: 0
			},
			position: {
				y: 100,
				x: 50
			}
		},
		particles: {
			color: {
				value: '#fff'
			},
			number: {
				value: 0
			},
			destroy: {
				bounds: {
					top: 30
				},
				mode: 'split',
				split: {
					count: 1,
					factor: {
						value: 0.333333
					},
					rate: {
						value: 100
					},
					particles: {
						stroke: {
							width: 0
						},
						color: {
							value: ['#ff595e', '#ffca3a', '#8ac926', '#1982c4', '#6a4c93']
						},
						number: {
							value: 0
						},
						collisions: {
							enable: false
						},
						destroy: {
							bounds: {
								top: 0
							}
						},
						opacity: {
							value: {
								min: 0.1,
								max: 1
							},
							animation: {
								enable: true,
								speed: 0.7,
								sync: false,
								startValue: 'max',
								destroy: 'min'
							}
						},
						effect: {
							type: 'trail',
							options: {
								trail: {
									length: {
										min: 5,
										max: 10
									}
								}
							}
						},
						shape: {
							type: 'circle'
						},
						size: {
							value: 2,
							animation: {
								enable: false
							}
						},
						life: {
							count: 1,
							duration: {
								value: {
									min: 1,
									max: 2
								}
							}
						},
						move: {
							enable: true,
							gravity: {
								enable: true,
								acceleration: 9.81,
								inverse: false
							},
							decay: 0.1,
							speed: {
								min: 10,
								max: 25
							},
							direction: 'outside',
							outModes: 'destroy'
						}
					}
				}
			},
			life: {
				count: 1
			},
			effect: {
				type: 'trail',
				options: {
					trail: {
						length: {
							min: 10,
							max: 30
						},
						minWidth: 1,
						maxWidth: 1
					}
				}
			},
			rotate: {
				path: true
			},
			shape: {
				type: 'circle'
			},
			size: {
				value: 1
			},
			move: {
				enable: true,
				gravity: {
					acceleration: 15,
					enable: true,
					inverse: true,
					maxSpeed: 100
				},
				speed: {
					min: 10,
					max: 20
				},
				outModes: {
					default: 'destroy',
					top: 'none'
				}
			}
		}
	};

	onMount(async () => {
		canvasEl.width = window.innerWidth;
		canvasEl.height = window.innerHeight;

		await loadAll(tsParticles);

		particles = await tsParticles.load({
			id: 'tsparticles',
			options: configs
		});

		particles.pause();

		const handleResize = () => {
			if (!canvasEl) return;
			canvasEl.width = window.innerWidth;
			canvasEl.height = window.innerHeight;
			particles?.refresh();
		};

		window.addEventListener('resize', handleResize);

		return () => {
			// onDestroy cleanup
			window.removeEventListener('resize', handleResize);
			particles?.destroy();
		};
	});

	$: {
		if (particles) {
			if (on) {
				particles.play();
			} else {
				particles.pause();
			}
		}
	}
</script>

<canvas
	bind:this={canvasEl}
	id="tsparticles"
	style="display: block; position: fixed; top: 0; left: 0; z-index: -1;"
>
	Canvas not supported
</canvas>
