# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [13.0.18](https://github.com/javalent/initiative-tracker/compare/13.0.17...13.0.18) (2025-08-17)


### Bug Fixes

* Fixes misspelling of Bloody in CR2.0 ([1cd43e9](https://github.com/javalent/initiative-tracker/commit/1cd43e96959543cb47a6b035954a3837813359a8))
* Fixes some instances of the encounter builder not loading for some XP systems ([1cd43e9](https://github.com/javalent/initiative-tracker/commit/1cd43e96959543cb47a6b035954a3837813359a8))
* Update name of Fantasy Statblocks in settings ([f501053](https://github.com/javalent/initiative-tracker/commit/f501053af75e6593b7a5e6dee4e5d52c5383a4f4))

## [13.0.17](https://github.com/javalent/initiative-tracker/compare/13.0.16...13.0.17) (2025-05-08)


### Bug Fixes

* add condition on select ([efe69d4](https://github.com/javalent/initiative-tracker/commit/efe69d4746f0cf5f743d3d5e327373457b7bf34d))
* add linter settings & revert accidental lint ([3e18bf8](https://github.com/javalent/initiative-tracker/commit/3e18bf80fbd9a5fbfc5ed4f4fbe439dad9f3d633))
* Filter out allied creatures in the encounter builder until a more permanent solution is found (lol) ([0a0e124](https://github.com/javalent/initiative-tracker/commit/0a0e12444deea510c46f1599859138cb941b156b))
* reapplying conditions won't remove them ([8238807](https://github.com/javalent/initiative-tracker/commit/823880765f829e24cd1a844bbd0e4e1225694c00))

## [13.0.16](https://github.com/javalent/initiative-tracker/compare/13.0.15...13.0.16) (2024-10-04)


### Bug Fixes

* Reverts unintentional breaking Dice Roller change ([5769efe](https://github.com/javalent/initiative-tracker/commit/5769efe56310034eeff2c3a65b9d2f82c576efee))

## [13.0.15](https://github.com/javalent/initiative-tracker/compare/13.0.14...13.0.15) (2024-09-27)


### Bug Fixes

* Encounters now allow creatures to be set to zero ([f9b5f6c](https://github.com/javalent/initiative-tracker/commit/f9b5f6cfba6e5234f0b570139a7a19ed079b3492))

## [13.0.14](https://github.com/javalent/initiative-tracker/compare/13.0.13...13.0.14) (2024-09-26)


### Bug Fixes

* Fixes issue preventing encounters containing dice rollers from rendering ([68f3de7](https://github.com/javalent/initiative-tracker/commit/68f3de7d1021328b67268174594b236c26adc23a))

## [13.0.13](https://github.com/javalent/initiative-tracker/compare/13.0.12...13.0.13) (2024-09-26)


### Bug Fixes

* Update Dice Roller integration ([34a1a15](https://github.com/javalent/initiative-tracker/commit/34a1a15f227642834e096d81fb67e0b4865705e4))

## [13.0.12](https://github.com/javalent/initiative-tracker/compare/13.0.11...13.0.12) (2024-06-02)


### Bug Fixes

* Fixes PF2e system difficulty threshold calculation ([bc8ebad](https://github.com/javalent/initiative-tracker/commit/bc8ebad7fa458dec34fbca733ba06adb1c5527c3))
* Fixes status descriptions displaying "null" if no description was set ([d1c44f6](https://github.com/javalent/initiative-tracker/commit/d1c44f625c2d7f57d66319336e010fce6b53979f))
* Fixes Statuses not being logged correctly when starting a log file ([82a8faf](https://github.com/javalent/initiative-tracker/commit/82a8faf42b851500a584a1ea47889c1f7703b163))
* Starting a new encounter from an Encounter block now correctly creates a new log file ([c6756ce](https://github.com/javalent/initiative-tracker/commit/c6756cec4cb0c3a33e4a8d86b9abc011b9556f23))

## [13.0.11](https://github.com/javalent/initiative-tracker/compare/13.0.10...13.0.11) (2024-05-09)


### Bug Fixes

* Check for Statblock-style links and transform them before parsing the `statblock-link` property ([8bc3ae5](https://github.com/javalent/initiative-tracker/commit/8bc3ae56bee16176e209c2e70b734e39f1285154))
* Fixes error where values specified as a list in a creature were not being filtered correctly in the encounter builder ([a395715](https://github.com/javalent/initiative-tracker/commit/a3957151c2e041bbf62607cade6a3a0c335ed616))
* Normalize derived options in Encounter Builder options filters ([27c4d92](https://github.com/javalent/initiative-tracker/commit/27c4d92fc7e95e4ae10502dc17744b0931822c55))

## [13.0.10](https://github.com/javalent/initiative-tracker/compare/13.0.9...13.0.10) (2024-05-02)


### Bug Fixes

* Creatures not in bestiary now render correctly in Combatant ([cebb672](https://github.com/javalent/initiative-tracker/commit/cebb672bedbce29cb8208d2dc9a7afdb33d276d2))

## [13.0.9](https://github.com/javalent/initiative-tracker/compare/13.0.8...13.0.9) (2024-05-01)


### Bug Fixes

* If an existing player view is found, reveal it ([2dda097](https://github.com/javalent/initiative-tracker/commit/2dda0978fe38cba9f7cdc82e0eff144ad104181b))
* Properly check for settings being initialized in the tracker before attempting to access data ([e7b4bd2](https://github.com/javalent/initiative-tracker/commit/e7b4bd242ea4cdecc7098b75032d183ee5c53a9f))

## [13.0.8](https://github.com/javalent/initiative-tracker/compare/13.0.7...13.0.8) (2024-04-28)


### Bug Fixes

* Fixes issue preventing encounter builder filters to open if an Options filter was present ([d2a5c03](https://github.com/javalent/initiative-tracker/commit/d2a5c03f046d84cbc1accee97032572231bcc77a))

## [13.0.7](https://github.com/javalent/initiative-tracker/compare/13.0.6...13.0.7) (2024-04-27)


### Bug Fixes

* Removes outdated message about Fantasy Statblocks compatibility ([8e85b58](https://github.com/javalent/initiative-tracker/commit/8e85b5878eba3efc75046bf110d6c70844d92f7a))

## [13.0.6](https://github.com/javalent/initiative-tracker/compare/13.0.5...13.0.6) (2024-04-23)


### Bug Fixes

* Remove obsidian-overload package ([775fe52](https://github.com/javalent/initiative-tracker/commit/775fe523d0717708bbad329d2c8ce50890dbbf3c))
* Switch to `[@javalent](https://github.com/javalent)` scoped FS module ([c8eeb33](https://github.com/javalent/initiative-tracker/commit/c8eeb33756aa988057988684a5c3bcf09eaeaa1a))

## [13.0.5](https://github.com/javalent/initiative-tracker/compare/13.0.4...13.0.5) (2024-04-15)


### Bug Fixes

* Encounter blocks will less greedily add the default party if players are explicitly defined ([eb4a59a](https://github.com/javalent/initiative-tracker/commit/eb4a59a5d1becda8ba659abe6238e0470ae7d987))
* Encounters copied from the Encounter Builder no longer include disabled players in the output (close [#265](https://github.com/javalent/initiative-tracker/issues/265)) ([fd045ac](https://github.com/javalent/initiative-tracker/commit/fd045ac75bf9acf731bf3876cac9f757191e48ec))

## [13.0.4](https://github.com/javalent/initiative-tracker/compare/13.0.3...13.0.4) (2024-03-23)


### Bug Fixes

* Fixes load encounter submenu on mobile ([e6f33ac](https://github.com/javalent/initiative-tracker/commit/e6f33ac64ef532de5c894930cc4626bd26d67a2b))

## [13.0.3](https://github.com/javalent/initiative-tracker/compare/13.0.2...13.0.3) (2024-03-22)


### Bug Fixes

* Fixes IT menus on mobile ([bfb2312](https://github.com/javalent/initiative-tracker/commit/bfb23123445362eb37010276729009adbfeddadd))
* Improves Add Creature experience on mobile ([5a20e10](https://github.com/javalent/initiative-tracker/commit/5a20e105f74079ce271ccf3a63e0c4546d71555c))
* Removes legacy creator option ([d8f6cdb](https://github.com/javalent/initiative-tracker/commit/d8f6cdb2b31fd2b0cf88e7e449079bab8fd21916))
* Slightly decreases font size on mobile for better readability ([54abd6f](https://github.com/javalent/initiative-tracker/commit/54abd6f94a1df1b4f89a701af5d7f4cecce06b2f))

## [13.0.2](https://github.com/javalent/initiative-tracker/compare/13.0.1...13.0.2) (2024-03-15)


### Bug Fixes

* Fixes Condition suggester not appearing ([aa2384b](https://github.com/javalent/initiative-tracker/commit/aa2384b75c60c524c889a212204db8406f8a8ef1))

## [13.0.1](https://github.com/javalent/initiative-tracker/compare/13.0.0...13.0.1) (2024-03-08)


### Bug Fixes

* Improves Fantasy Statblocks bestiary resolution behavior ([a1a3d07](https://github.com/javalent/initiative-tracker/commit/a1a3d075c973953202c611fdb22b9979215105f6))
* Properly unload FS resolve event ([17aa794](https://github.com/javalent/initiative-tracker/commit/17aa79472190defcf684fb333fea852b9ccce694))

## [13.0.0](https://github.com/javalent/initiative-tracker/compare/12.5.0...13.0.0) (2024-03-05)


### ⚠ BREAKING CHANGES

* switch to new Fantasy Statblocks API

### Features

* Switch to Fantasy Statblocks API ([a993447](https://github.com/javalent/initiative-tracker/commit/a993447c948596f59e3a426bb4dc824ba4625dfd))
* switch to new Fantasy Statblocks API ([28c8363](https://github.com/javalent/initiative-tracker/commit/28c836321dd5432f8c830b4c5a2c1a8ddeb7229f))


### Bug Fixes

* No longer unload views when plugin is unloaded ([fedc639](https://github.com/javalent/initiative-tracker/commit/fedc6397c9b2f49477fb0bb1f557778c9e16794f))
* Notify users of new FS version requirement. ([9ea056e](https://github.com/javalent/initiative-tracker/commit/9ea056e93fc379623b5bed191bc96a482ce96ba8))
* remove logs ([f84a61c](https://github.com/javalent/initiative-tracker/commit/f84a61c1433752164022fa5d91c8c7df9cbcee91))
* Switch to centrally managed input suggesters ([f5e536e](https://github.com/javalent/initiative-tracker/commit/f5e536ee2b4abe73c9b6268aac9c517cf2bfe8b7))

## [12.5.0](https://github.com/javalent/initiative-tracker/compare/12.4.5...12.5.0) (2024-02-01)


### Features

* Add Dnd 5e 'Flee, Mortals!' XP System ([#248](https://github.com/javalent/initiative-tracker/issues/248)) ([761375c](https://github.com/javalent/initiative-tracker/commit/761375c3032f77bfca08e09ae789018b597ec6c6))


### Bug Fixes

* Difficulty displays will now update when XP system is changed ([03f786d](https://github.com/javalent/initiative-tracker/commit/03f786d5db05314cd6893b67224060aaa5a06740))
* respect players & party when launching encounters via API ([146215f](https://github.com/javalent/initiative-tracker/commit/146215f5233e88d2e189444bcfbf04f6db9bb088))

## [12.4.5](https://github.com/javalent/initiative-tracker/compare/12.4.4...12.4.5) (2024-01-12)


### Bug Fixes

* ignore null player levels when finding daily budget ([48dc637](https://github.com/javalent/initiative-tracker/commit/48dc63750dc6046be1fbd6db8b3fcbc7e074a5c2))

## [12.4.4](https://github.com/javalent/initiative-tracker/compare/12.4.3...12.4.4) (2024-01-12)


### Bug Fixes

* fix error caused by no player level being set ([d8639ec](https://github.com/javalent/initiative-tracker/commit/d8639ec667a8ad44c1a025b96e4b2d46a4bcde82))

## [12.4.3](https://github.com/javalent/initiative-tracker/compare/12.4.2...12.4.3) (2024-01-11)


### Bug Fixes

* Creatures will roll for HP correctly when added through the UI ([e6198f1](https://github.com/javalent/initiative-tracker/commit/e6198f1272f20bdf9c5096a37b56c3536b48325a))
* fixes party level calculation for pf2e system ([005f7ec](https://github.com/javalent/initiative-tracker/commit/005f7ec1b40e5eeb637e562a9a5d8738ce89c990))
* removed logs ([21a6acc](https://github.com/javalent/initiative-tracker/commit/21a6acc5f364409baa18a69d803fbc14e1c99289))

## [12.4.2](https://github.com/javalent/initiative-tracker/compare/12.4.1...12.4.2) (2023-10-17)


### Bug Fixes

* Fixes issue where the encounter builder ribbon icon could cause the plugin to not load ([6534c87](https://github.com/javalent/initiative-tracker/commit/6534c8711fc03a7ca905d774b94cdb62bcf26fbe))

## [12.4.1](https://github.com/javalent/initiative-tracker/compare/12.4.0...12.4.1) (2023-10-17)


### Bug Fixes

* Party size is now taken into account when calculating 5e difficulties ([9e8bdde](https://github.com/javalent/initiative-tracker/commit/9e8bdde5f86de9fcd294ed3ed4f819636f4465d3))

## [12.4.0](https://github.com/javalent/initiative-tracker/compare/12.3.1...12.4.0) (2023-10-16)


### Features

* Commands will now be registered to start each saved encounter ([15887b0](https://github.com/javalent/initiative-tracker/commit/15887b0748250558af55d2ba6ba8dd6db874c9a9))


### Bug Fixes

* Fixes issues with deleting encounters from settings ([69a9d94](https://github.com/javalent/initiative-tracker/commit/69a9d94385580c7ba1a8fa78cdaad47458f1e95a))

## [12.3.1](https://github.com/javalent/initiative-tracker/compare/12.3.0...12.3.1) (2023-10-12)


### Bug Fixes

* Fixes issue with Dice Roller integration (close [#232](https://github.com/javalent/initiative-tracker/issues/232)) ([3888416](https://github.com/javalent/initiative-tracker/commit/3888416b4527c4f27c90854b3261897bc5373c94))

## [12.3.0](https://github.com/javalent/initiative-tracker/compare/12.2.6...12.3.0) (2023-10-09)


### Features

* Add DnD 5e Cr2.0 Simple XP Calculation System ([#230](https://github.com/javalent/initiative-tracker/issues/230)) ([f369cad](https://github.com/javalent/initiative-tracker/commit/f369cad6171e16ac00ef128511cc49cdea156229))
* Basic API started ([a136eb1](https://github.com/javalent/initiative-tracker/commit/a136eb1ee5bb812f342520d463905be33d3e2d75))

## [12.2.6](https://github.com/javalent/initiative-tracker/compare/12.2.5...12.2.6) (2023-09-29)


### Bug Fixes

* :bug: Correctly number first instance of a creature when adding more ([6424b23](https://github.com/javalent/initiative-tracker/commit/6424b2312432662b377548a7107a7f09b48e81f3))

## [12.2.5](https://github.com/javalent/initiative-tracker/compare/12.2.4...12.2.5) (2023-09-29)


### Bug Fixes

* 🐛 Improves grouped creature initiative rolling logic ([97cd5e7](https://github.com/javalent/initiative-tracker/commit/97cd5e78624a1595f2c5f3e0ef7a26e9cfbf55f3))
* 🚸 Adds "Roll Initiative" button to Tracker table ([61fbe47](https://github.com/javalent/initiative-tracker/commit/61fbe47bfa7506de4e164f2d5d9fac20dd0b0f01))

## [12.2.4](https://github.com/javalent/initiative-tracker/compare/12.2.3...12.2.4) (2023-09-22)


### Bug Fixes

* fixes setting max hp from notes ([300860d](https://github.com/javalent/initiative-tracker/commit/300860d38b729bd408360b99c8b5fbb4b4251405))

## [12.2.3](https://github.com/javalent/initiative-tracker/compare/12.2.2...12.2.3) (2023-09-20)


### Bug Fixes

* beep boop ([bf9cc08](https://github.com/javalent/initiative-tracker/commit/bf9cc08fefd71ed58f4f8e94b7b211eb56301a45))

## [12.2.2](https://github.com/javalent/initiative-tracker/compare/12.2.1...12.2.2) (2023-09-20)


### Bug Fixes

* Respect never rolling initiative when launching encounter ([1ab1271](https://github.com/javalent/initiative-tracker/commit/1ab1271ec8a77d500a85e612152b504e36a9abc6))

## [12.2.1](https://github.com/javalent/initiative-tracker/compare/12.2.0...12.2.1) (2023-09-20)


### Bug Fixes

* Allow negative initiatives ([7c6eb4c](https://github.com/javalent/initiative-tracker/commit/7c6eb4c849916f4f4a9b39217e2a7987521d2967))

## [12.2.0](https://github.com/javalent/initiative-tracker/compare/12.1.4...12.2.0) (2023-09-19)


### Features

* Can now change how Player initiatives are rolled in the Tracker controls ([4fe45ff](https://github.com/javalent/initiative-tracker/commit/4fe45ff63a3774db1449be8aff7ec886e8fc8a96))

## [12.1.4](https://github.com/javalent/initiative-tracker/compare/12.1.3...12.1.4) (2023-09-12)


### Bug Fixes

* Ignore creatures from FS that shouldn't be in bestiary. ([77d048d](https://github.com/javalent/initiative-tracker/commit/77d048d793c94f6d4b0d0cf332deeb1f943c727a))

## [12.1.3](https://github.com/javalent/initiative-tracker/compare/12.1.2...12.1.3) (2023-09-05)


### Bug Fixes

* Respect creature HP when given as array in encounters ([244fe03](https://github.com/javalent/initiative-tracker/commit/244fe03a1954f6081ac8a26b478441978d35bb6d))

## [12.1.2](https://github.com/javalent/initiative-tracker/compare/12.1.1...12.1.2) (2023-08-25)


### Bug Fixes

* Creatures with HP specified will no longer roll HP ([8790517](https://github.com/javalent/initiative-tracker/commit/8790517f88d3f94e38e4477579e291a3bfcb81b7))

## [12.1.1](https://github.com/javalent/initiative-tracker/compare/12.1.0...12.1.1) (2023-08-24)


### Bug Fixes

* add `false` as an option for parties ([0651b84](https://github.com/javalent/initiative-tracker/commit/0651b84fd4d55484ea5f16459f649030d2cd1263))
* fixes highlighting in creature suggester ([ee5f812](https://github.com/javalent/initiative-tracker/commit/ee5f812c204aeee55b25e92cbf4d31734a25aea7))
* use statblock's bestiary names API vs transforming every time ([e7038d1](https://github.com/javalent/initiative-tracker/commit/e7038d16edd48fb40b3f9ddd700f796475f15c34))

## [12.1.0](https://github.com/javalent/initiative-tracker/compare/12.0.0...12.1.0) (2023-08-16)


### Features

* Adds Editor Suggestor for encounter blocks (close [#185](https://github.com/javalent/initiative-tracker/issues/185)) ([012b1eb](https://github.com/javalent/initiative-tracker/commit/012b1eb4c3f95eaa1547ddfe59a66d0b587f7228))
* Can now sort initiatives by descendig or ascending ([#68](https://github.com/javalent/initiative-tracker/issues/68)) ([079b59c](https://github.com/javalent/initiative-tracker/commit/079b59c8a5d24bca96eb9ca1ab0cf1c8cda2afa1))
* Copy encounter string to clipboard in Builder (close [#207](https://github.com/javalent/initiative-tracker/issues/207)) ([360ca03](https://github.com/javalent/initiative-tracker/commit/360ca03aa19ae500296be38e1bfc21905193a777))


### Bug Fixes

* Can set party to None in tracker menu ([268b661](https://github.com/javalent/initiative-tracker/commit/268b66108e90dc615e22c50d9b697784f04974ed))
* fixes bug preventing adding players via the "Add Creature" button ([#197](https://github.com/javalent/initiative-tracker/issues/197)) ([3e5cc4d](https://github.com/javalent/initiative-tracker/commit/3e5cc4d7c7fc55ca42195ce7d794e5f6e74b8b83))
* fixes display of suggestor for Obsidian 1.4+ ([1ba2348](https://github.com/javalent/initiative-tracker/commit/1ba234815af3bb092b9d04bbd9fb9b7c01808337))
* fixes rolling dice for array-based modifiers (close [#196](https://github.com/javalent/initiative-tracker/issues/196)) ([e489766](https://github.com/javalent/initiative-tracker/commit/e48976659b5065b2818b7e2644b2b7a6ffa83b7e))
* fully remove leaflet support (for now) ([51aed21](https://github.com/javalent/initiative-tracker/commit/51aed212bd1126331dcc3e91f3d6c3f2f475082a))
* handle players added directly in encounters, not just through parties ([#197](https://github.com/javalent/initiative-tracker/issues/197)) ([4317e07](https://github.com/javalent/initiative-tracker/commit/4317e0741b707fee2b54627beb82666d5e9b8392))
* improves player management in settings ([169cc7d](https://github.com/javalent/initiative-tracker/commit/169cc7d6c3ae564e96a007728f4f5e2d631cacf2))
* Only set difficulty if the highest threshold is &gt; 0 ([#197](https://github.com/javalent/initiative-tracker/issues/197)) ([11c3db7](https://github.com/javalent/initiative-tracker/commit/11c3db755da187703b28ed503c75226750f15287))
* Roll initiative for creatures added to encounters (close [#81](https://github.com/javalent/initiative-tracker/issues/81)) ([fefe218](https://github.com/javalent/initiative-tracker/commit/fefe2189f5a5e4417ec7226a7176362b9a4ad309))

## [12.0.0](https://github.com/javalent/initiative-tracker/compare/11.3.1...12.0.0) (2023-08-11)


### ⚠ BREAKING CHANGES

* As this is a removal of an existing feature, this is technically a breaking change.

### Features

* This removed the feature of Leaflet integration. However, this feature has been broken. ([ad30f98](https://github.com/javalent/initiative-tracker/commit/ad30f98d28b083249de5cbd5b03e335346d7e963))


### Bug Fixes

* correctly retrieve creatures from bestiary in encounters ([195d871](https://github.com/javalent/initiative-tracker/commit/195d871186d6fcd9fa12b109fd3fb3031ced8204))

## [11.3.1](https://github.com/javalent/initiative-tracker/compare/11.3.0...11.3.1) (2023-08-02)


### Bug Fixes

* fixes incorrect variable name reference (close [#200](https://github.com/javalent/initiative-tracker/issues/200)) ([f45be61](https://github.com/javalent/initiative-tracker/commit/f45be6143c9431fa8c281cfe7cd212f10b669da2))

## [11.3.0](https://github.com/javalent/initiative-tracker/compare/11.2.0...11.3.0) (2023-08-02)


### Features

* PF2e Encounter Building Rules ([618c78d](https://github.com/javalent/initiative-tracker/commit/618c78d82a6f48b021519696f4abe902da4f336e))

## [11.2.0](https://github.com/javalent/initiative-tracker/compare/11.1.7...11.2.0) (2023-06-28)


### Features

* Adds the Lazy GM additional difficulty calculation method + a scaffold for future difficulty methods. ([2c39c7b](https://github.com/javalent/initiative-tracker/commit/2c39c7b29e84d7ec7193887474783ace3c206c91))

## [11.1.7](https://github.com/javalent/initiative-tracker/compare/11.1.6...11.1.7) (2023-05-24)


### Bug Fixes

* decimal crs now pull xp correctly (close [#190](https://github.com/javalent/initiative-tracker/issues/190)) ([e293e78](https://github.com/javalent/initiative-tracker/commit/e293e78a2329ba3067ad35e00c38c9f37c23da40))

## [11.1.6](https://github.com/javalent/initiative-tracker/compare/11.1.5...11.1.6) (2023-05-17)


### Bug Fixes

* Encounters pull FS creatures correctly ([0db3845](https://github.com/javalent/initiative-tracker/commit/0db3845fdc68344828e80ab45cd53a6977a766de))

## [11.1.5](https://github.com/javalent/initiative-tracker/compare/11.1.4...11.1.5) (2023-05-14)


### Bug Fixes

* actually remove side effects from updateCreatureByName ([cf8bf9f](https://github.com/javalent/initiative-tracker/commit/cf8bf9f806aa0693b3a00551cc9ee53d8ed0d57b))

## [11.1.4](https://github.com/javalent/initiative-tracker/compare/11.1.3...11.1.4) (2023-05-14)


### Bug Fixes

* updateCreatureByName no longer has side effects ([a327221](https://github.com/javalent/initiative-tracker/commit/a327221c878f9c26c1cefbe73d98eea33eca080b))

## [11.1.3](https://github.com/javalent/initiative-tracker/compare/11.1.2...11.1.3) (2023-05-13)


### Bug Fixes

* remove AC from player view ([c6ecb19](https://github.com/javalent/initiative-tracker/commit/c6ecb19cfbf0f39fc3e264b3e9bf5c41d480c019))

## [11.1.2](https://github.com/javalent/initiative-tracker/compare/11.1.1...11.1.2) (2023-05-13)


### Bug Fixes

* `updateCreatureByName` accepts a status array now ([7e8cf1f](https://github.com/javalent/initiative-tracker/commit/7e8cf1fd3c0847e32879cadaa57d88286679e3b4))
* Fixes `updateCreatureByName` ([4d36f25](https://github.com/javalent/initiative-tracker/commit/4d36f25a3d98aa46fd5eb4472b12d522909061aa))

## [11.1.1](https://github.com/javalent/initiative-tracker/compare/11.1.0...11.1.1) (2023-05-13)


### Bug Fixes

* adds updateCreatureByName tracker method ([94396a2](https://github.com/javalent/initiative-tracker/commit/94396a2f3822e97fd29b277f019ecc3bdea1d333))

## [11.1.0](https://github.com/javalent/initiative-tracker/compare/11.0.0...11.1.0) (2023-05-13)


### Features

* **publish:** Added Creature as Player Images ([481a221](https://github.com/javalent/initiative-tracker/commit/481a22165679ab084955f1e8dde981d246d436f7))
* **publish:** Added Creature as Player Images ([c4d09d5](https://github.com/javalent/initiative-tracker/commit/c4d09d5f3080d82afe134300ee86439179063260))


### Bug Fixes

* expose tracker as temporary API ([48d7a1c](https://github.com/javalent/initiative-tracker/commit/48d7a1cb96b70144553afe2af138b9ac8e73cb13))

## [11.0.0](https://github.com/javalent/initiative-tracker/compare/v10.0.1...11.0.0) (2023-05-09)


### ⚠ BREAKING CHANGES

* Removed 5e SRD from Initiative Tracker

### Features

* Can now specify initiative as static (close [#74](https://github.com/javalent/initiative-tracker/issues/74)) ([b602f5c](https://github.com/javalent/initiative-tracker/commit/b602f5c790df097fcd4f2482d52ce36d7b28ab77))
* Creatures set as a player from Fantasy Statblocks now treated as players ([cda408b](https://github.com/javalent/initiative-tracker/commit/cda408b74b46dcd04b263bf389bc916e362cf184))
* Encounter Builder Custom Filters ([0146f8a](https://github.com/javalent/initiative-tracker/commit/0146f8af80343379aaf1cf5a15f77cfccdf8c31d))
* Load saved encounters into builder ([de7181c](https://github.com/javalent/initiative-tracker/commit/de7181cdfab548179a5848a065dad9a31c6c22a0))
* Removed 5e SRD from Initiative Tracker ([260abfc](https://github.com/javalent/initiative-tracker/commit/260abfcc81b28fae1232a8600496c1f3c624056a))


### Bug Fixes

* Changes to players sync back to linked notes (close [#176](https://github.com/javalent/initiative-tracker/issues/176)) ([40da2d3](https://github.com/javalent/initiative-tracker/commit/40da2d3492f9b7745130cb5b415eaeb23afeddfe))
* Confirm to overwrite saved encounters ([be070ee](https://github.com/javalent/initiative-tracker/commit/be070eeed6a6ff872c3c20c2ab40c61e69edbe67))
* Creature difficulty now won't display if CR is not present ([a1079c4](https://github.com/javalent/initiative-tracker/commit/a1079c4c3ff57c91bfd75e8a062ec42ff3a76bb8))
* Creature hidden state no longer reset with HP / Status ([e88b468](https://github.com/javalent/initiative-tracker/commit/e88b468cd7c7276b7d6f8d2e832a862c03c1abf3))
* Display friendly state in Player View ([c3ff665](https://github.com/javalent/initiative-tracker/commit/c3ff6652e4ba92f4b9c956ebf2b99b522b7076e9))
* Display saved encounters in settings ([bcb9e14](https://github.com/javalent/initiative-tracker/commit/bcb9e14c6a2ecc415dfea5adafecaded9d354e63))
* do not open creature suggester immediately when editing a creature ([4340370](https://github.com/javalent/initiative-tracker/commit/434037050a43a003827998ae2f45071ccaffa94d))
* Encounter Builder encounters will save between reloads ([dca66ab](https://github.com/javalent/initiative-tracker/commit/dca66abb23c302d84a00c9f6e72d2c9db35ec8bd))
* Encounter builder supports hidden and friendly creatures ([20d2ee7](https://github.com/javalent/initiative-tracker/commit/20d2ee77a2283d03217ca421b26ef62c7d81e087))
* Encounters saved from builder now roll initiatives correctly ([50e9281](https://github.com/javalent/initiative-tracker/commit/50e9281abafa2a53b003230abecbc8dc16771aec))
* fixes issue where levels other than 1-20 caused encounter calculation errors ([4599fc6](https://github.com/javalent/initiative-tracker/commit/4599fc64c8b543dd13e99b2f60d6f653382e7e55))
* Fixes issue with deleting saved encounters ([75c8664](https://github.com/javalent/initiative-tracker/commit/75c8664bb68baea64a89d90e738ba1e17b713ad8))
* Fixes player display in settings ([5336fef](https://github.com/javalent/initiative-tracker/commit/5336fef4102b9f500be63d503f9fee59387e3388))
* Fixes reset filters to default ([de9a394](https://github.com/javalent/initiative-tracker/commit/de9a3942f67611bb2111829d013fb82670c6ad98))
* fixes saving players sometimes duplicating ([c8c2a9b](https://github.com/javalent/initiative-tracker/commit/c8c2a9bf91e09fac4c75126ebc9df49eab8da936))
* getting a player by name now returns a creature if no player exists ([0549522](https://github.com/javalent/initiative-tracker/commit/054952278eb92fda243eea498ac598ed0c44d5d1))
* **issues:** Typo Fix ([d2dc915](https://github.com/javalent/initiative-tracker/commit/d2dc9153111b02f8ca7e2763f9a0b6568b32802f))
* **issues:** Typo Fix ([7347187](https://github.com/javalent/initiative-tracker/commit/734718755e938f500be916f8a7c27c077297c609))
* Load encounters disabled when no encounters exist ([06b1a45](https://github.com/javalent/initiative-tracker/commit/06b1a452651fba6d995f12c69498af02a9f19eeb))
* only include player levels in encounter if they are a number ([3fb298f](https://github.com/javalent/initiative-tracker/commit/3fb298f81bd3c2a1e0a450d4f76a3919d22a89d8))
* Plugin will now properly save encounters immediately from the builder ([daa8ce2](https://github.com/javalent/initiative-tracker/commit/daa8ce2f33b85e7f06734948f9cb3777657ada42))
* removes logs ([ca9b95f](https://github.com/javalent/initiative-tracker/commit/ca9b95f3392482fa142a9a60f6b20e5ea12780db))
* Saved encounters now respect the roll HP setting ([554a430](https://github.com/javalent/initiative-tracker/commit/554a430569fc93b1955c08b43474b6a1e535a1f3))
* show player level in settings ([e739698](https://github.com/javalent/initiative-tracker/commit/e739698cef1a7ac9d79cc53308b32bc47b7d2fbf))

## [10.0.1](https://github.com/javalent/initiative-tracker/compare/10.0.0...10.0.1) (2023-05-05)


### Bug Fixes

* Fixes reset filters to default ([de9a394](https://github.com/javalent/initiative-tracker/commit/de9a3942f67611bb2111829d013fb82670c6ad98))

## [10.0.0](https://github.com/javalent/initiative-tracker/compare/9.11.1...10.0.0) (2023-05-05)


### ⚠ BREAKING CHANGES

* Removed 5e SRD from Initiative Tracker

### Features

* Encounter Builder Custom Filters ([0146f8a](https://github.com/javalent/initiative-tracker/commit/0146f8af80343379aaf1cf5a15f77cfccdf8c31d))
* Removed 5e SRD from Initiative Tracker ([260abfc](https://github.com/javalent/initiative-tracker/commit/260abfcc81b28fae1232a8600496c1f3c624056a))


### Bug Fixes

* do not open creature suggester immediately when editing a creature ([4340370](https://github.com/javalent/initiative-tracker/commit/434037050a43a003827998ae2f45071ccaffa94d))
* removes logs ([ca9b95f](https://github.com/javalent/initiative-tracker/commit/ca9b95f3392482fa142a9a60f6b20e5ea12780db))

## [9.11.1](https://github.com/javalent/initiative-tracker/compare/9.11.0...9.11.1) (2023-05-03)


### Bug Fixes

* better handling for multiple modifiers ([6a866f6](https://github.com/javalent/initiative-tracker/commit/6a866f67bcb8d8128bf4cfd69bcf889cedfea44a))

## [9.11.0](https://github.com/javalent/initiative-tracker/compare/9.10.0...9.11.0) (2023-05-03)


### Features

* Support for more complicated initiatives ([f0b698a](https://github.com/javalent/initiative-tracker/commit/f0b698a54c2769cd117af2307d09921868f3b4ca))


### Bug Fixes

* Add statuses with enter key ([70be5ad](https://github.com/javalent/initiative-tracker/commit/70be5ad2ee323838769f9ef72c73214e11beeb45))
* Improves creature HP/Status editing UI ([70be5ad](https://github.com/javalent/initiative-tracker/commit/70be5ad2ee323838769f9ef72c73214e11beeb45))

## [9.10.0](https://github.com/javalent/initiative-tracker/compare/9.9.0...9.10.0) (2023-05-02)


### Features

* You can now create custom encounter builder headers ([2c42744](https://github.com/javalent/initiative-tracker/commit/2c42744b3ec0b20059d5ff68cdc6ec037415effa))


### Bug Fixes

* can disable encounter builder ribbon icon ([d6d2bee](https://github.com/javalent/initiative-tracker/commit/d6d2bee38d423ac1512ec81b5704f3a540839b17))
* can now open combatant view for creatures in encounter builder ([d6d2bee](https://github.com/javalent/initiative-tracker/commit/d6d2bee38d423ac1512ec81b5704f3a540839b17))
* creatures in table display difficulty ([921034a](https://github.com/javalent/initiative-tracker/commit/921034a695a04312ffa09768329e9fdc791b8e04))
* encounter builder name is editable ([d6d2bee](https://github.com/javalent/initiative-tracker/commit/d6d2bee38d423ac1512ec81b5704f3a540839b17))
* launching encounter from builder works again ([d6d2bee](https://github.com/javalent/initiative-tracker/commit/d6d2bee38d423ac1512ec81b5704f3a540839b17))
* new encounter builder ribbon icon ([d6d2bee](https://github.com/javalent/initiative-tracker/commit/d6d2bee38d423ac1512ec81b5704f3a540839b17))
* player & xp sections of builder are collapsible ([8505873](https://github.com/javalent/initiative-tracker/commit/85058739e04b9947fe08dc93e732bf3095dbf5b1))

## [9.9.0](https://github.com/javalent/initiative-tracker/compare/9.8.2...9.9.0) (2023-05-02)


### Features

* encounter creatures can be clicked to open combatant view ([6fea212](https://github.com/javalent/initiative-tracker/commit/6fea2126d68857847d4e7a837371ecf3c979a7e0))


### Bug Fixes

* `friendly` can be used for allies (close [#157](https://github.com/javalent/initiative-tracker/issues/157)) ([114896f](https://github.com/javalent/initiative-tracker/commit/114896f91250338dea4036e0696e6fe799abc3f8))
* Add to Encounter will add players that aren't already in the encounter (close [#160](https://github.com/javalent/initiative-tracker/issues/160)) ([37a6520](https://github.com/javalent/initiative-tracker/commit/37a6520bc10d4b06022371a176ee200ce8656df9))
* display hidden & friendly icons in encounter ([b46545f](https://github.com/javalent/initiative-tracker/commit/b46545fbf7faea19775a5f0b70def400045c00e5))
* hp state for rollable creatures now persists ([b8fb407](https://github.com/javalent/initiative-tracker/commit/b8fb407b46614e218821b2d48d79a48ed73c92aa))
* save initiative state when resetting ac ([f362df1](https://github.com/javalent/initiative-tracker/commit/f362df1a5c8f7903665458d79d5bcee8acbf7873))

## [9.8.2](https://github.com/javalent/initiative-tracker/compare/9.8.1...9.8.2) (2023-04-25)


### Bug Fixes

* improvised statuses work again (close [#148](https://github.com/javalent/initiative-tracker/issues/148)) ([53dcaa2](https://github.com/javalent/initiative-tracker/commit/53dcaa20708f570d40e1edf34a8656d060061d76))

## [9.8.1](https://github.com/javalent/initiative-tracker/compare/9.8.0...9.8.1) (2023-04-25)


### Bug Fixes

* ac updatable (oops) ([#148](https://github.com/javalent/initiative-tracker/issues/148)) ([ebd2b5e](https://github.com/javalent/initiative-tracker/commit/ebd2b5ecefa7d0e9ba78265089fd15fabe6e1aea))
* fix max HP cannot be entered ([#148](https://github.com/javalent/initiative-tracker/issues/148)) ([fb09d9d](https://github.com/javalent/initiative-tracker/commit/fb09d9d9233db1749747487cd16807555e97736c))
* fixes max hp logging ([5996907](https://github.com/javalent/initiative-tracker/commit/5996907b3666f4d71fff8ca4106c78325ddf8191))
* re-add value to hp guard ([60b6949](https://github.com/javalent/initiative-tracker/commit/60b69492085f793978dbf6092c9bc83c2efb06b1))

## [9.8.0](https://github.com/javalent/initiative-tracker/compare/9.7.1...9.8.0) (2023-04-25)


### Features

* add functionality for max HP damage ([38ebd91](https://github.com/javalent/initiative-tracker/commit/38ebd91e72725c9fd5f7c0129b4113a14410b303))
* Temporarily change AC on the fly ([#118](https://github.com/javalent/initiative-tracker/issues/118)) ([ac03929](https://github.com/javalent/initiative-tracker/commit/ac03929daee48baeaa4767f6ec81ae164ca61e32))


### Bug Fixes

* status amount set if not ([6189dda](https://github.com/javalent/initiative-tracker/commit/6189dda67d156e82889df73810d51c058262f47e))

## [9.7.1](https://github.com/javalent/initiative-tracker/compare/9.7.0...9.7.1) (2023-04-24)


### Bug Fixes

* handling of status amounts and logging of receiving multiple statuses ([#141](https://github.com/javalent/initiative-tracker/issues/141)) ([2821442](https://github.com/javalent/initiative-tracker/commit/28214427a6af672a63ae562351dd4761fbb2d53a))
* show statuses' names rather than their IDs ([#145](https://github.com/javalent/initiative-tracker/issues/145)) ([d8cf7c8](https://github.com/javalent/initiative-tracker/commit/d8cf7c8b22304ec12ed9ec5f985da3e3bfd83b2a))

## [9.7.0](https://github.com/javalent/initiative-tracker/compare/9.6.7...9.7.0) (2023-04-23)


### Features

* Can now add multiple statuses to creatures at a time ([afb603e](https://github.com/javalent/initiative-tracker/commit/afb603eac3e34966a72376eaf4cf968a04a622c5))
* Statuses can now be set to reset each round (close [#139](https://github.com/javalent/initiative-tracker/issues/139)) ([28f63cf](https://github.com/javalent/initiative-tracker/commit/28f63cf1012aaea3e70bfd7586edcb90ad801a60))
* Statuses can now have amounts associated ([84b358b](https://github.com/javalent/initiative-tracker/commit/84b358b2a50550a969b2aa0b63389291730449cd))

## [9.6.7](https://github.com/javalent/initiative-tracker/compare/9.6.6...9.6.7) (2023-04-22)


### Bug Fixes

* Extends functionality works from Statblocks (close [#100](https://github.com/javalent/initiative-tracker/issues/100)) ([055f07e](https://github.com/javalent/initiative-tracker/commit/055f07ed50ad8a15ebd4fc90dfdce3d6129e8127))
* properly log automatic unconscious status (close [#132](https://github.com/javalent/initiative-tracker/issues/132)) ([#133](https://github.com/javalent/initiative-tracker/issues/133)) ([0065bf6](https://github.com/javalent/initiative-tracker/commit/0065bf668d9c9ed7c1a5ac0fb462778c10e02fa3))
* Unconscious status can now be removed or reset (close [#129](https://github.com/javalent/initiative-tracker/issues/129)) ([f61d524](https://github.com/javalent/initiative-tracker/commit/f61d524273148f24845f0ac9a869c099d09e63df))

## [9.6.6](https://github.com/javalent/initiative-tracker/compare/9.6.5...9.6.6) (2023-04-22)


### Bug Fixes

* Expose Creature interface ([418d8bb](https://github.com/javalent/initiative-tracker/commit/418d8bb4303c48f62d5127d3d9f6f0e6801160c2))

## [9.6.5](https://github.com/javalent/initiative-tracker/compare/9.6.4...9.6.5) (2023-04-22)


### Bug Fixes

* use types from statblocks ([db46505](https://github.com/javalent/initiative-tracker/commit/db465051fb782c4874f04a86607579bf4931f56b))

## [9.6.4](https://github.com/javalent/initiative-tracker/compare/9.6.3...9.6.4) (2023-04-21)


### Bug Fixes

* fixes difficulty & xp calculation (close [#113](https://github.com/javalent/initiative-tracker/issues/113), close [#110](https://github.com/javalent/initiative-tracker/issues/110)) ([41e0168](https://github.com/javalent/initiative-tracker/commit/41e0168cac6ee7c2411fa0a7f4498dbb17b29513))

## [9.6.3](https://github.com/javalent/initiative-tracker/compare/9.6.2...9.6.3) (2023-04-20)


### Bug Fixes

* npm release ([9f8658c](https://github.com/javalent/initiative-tracker/commit/9f8658c05cfef08c0b65268af1c07890418a4411))

## [9.6.2](https://github.com/valentine195/initiative-tracker/compare/v9.6.1...9.6.2) (2023-04-18)


### Bug Fixes

* fixes release config tag ([226f8e5](https://github.com/valentine195/initiative-tracker/commit/226f8e583dfb83640c59a7f044addea6a51a4cda))
* switch to Dice Roller package ([49d1b4a](https://github.com/valentine195/initiative-tracker/commit/49d1b4aa8a6d918649d206811c64346db443d865))

## [9.6.1](https://github.com/valentine195/initiative-tracker/compare/v9.6.0...v9.6.1) (2023-04-18)


### Bug Fixes

* fixes release ([4a638f8](https://github.com/valentine195/initiative-tracker/commit/4a638f87c4d18d91d05d737ed17772b030d82487))

## [9.5.0](https://github.com/valentine195/obsidian-initiative-tracker/compare/9.4.4...9.5.0) (2023-04-16)


### Features

* enable inline encounter creature stats & display name changes ([#102](https://github.com/valentine195/obsidian-initiative-tracker/issues/102)) ([717f4e7](https://github.com/valentine195/obsidian-initiative-tracker/commit/717f4e7eca88a77f7f06b9ab61a72a62c52febf4))

### [9.4.4](https://github.com/valentine195/obsidian-initiative-tracker/compare/9.4.3...9.4.4) (2023-04-15)

### [9.4.3](https://github.com/valentine195/obsidian-initiative-tracker/compare/9.4.2...9.4.3) (2023-04-12)


### Bug Fixes

* new "Open Log File" button when logging ([044cbcc](https://github.com/valentine195/obsidian-initiative-tracker/commit/044cbcc02fef81937075dcdbd2679806a4e84216))

### [9.4.2](https://github.com/valentine195/obsidian-initiative-tracker/compare/9.4.1...9.4.2) (2023-04-12)


### Bug Fixes

* tracker now properly logs additional state changes ([57a70df](https://github.com/valentine195/obsidian-initiative-tracker/commit/57a70dfe7fd3a2c5838fdac9ae17bd054754dba8))

### [9.4.1](https://github.com/valentine195/obsidian-initiative-tracker/compare/9.4.0...9.4.1) (2023-04-12)


### Bug Fixes

* fixes initiative order when copying ([5090c0c](https://github.com/valentine195/obsidian-initiative-tracker/commit/5090c0ca1355a4e71ae4cd5cbaea1f7ac35db045))

## [9.4.0](https://github.com/valentine195/obsidian-initiative-tracker/compare/9.3.2...9.4.0) (2023-04-12)


### Features

* Can now mark creatures friendly in creator ([47bb840](https://github.com/valentine195/obsidian-initiative-tracker/commit/47bb8404af6d0dadadd4fef44a89ed509850c1a6))

### [9.3.2](https://github.com/valentine195/obsidian-initiative-tracker/compare/9.3.1...9.3.2) (2023-04-08)

### [9.3.1](https://github.com/valentine195/obsidian-initiative-tracker/compare/9.3.0...9.3.1) (2023-04-08)

### [9.2.1](https://github.com/valentine195/obsidian-initiative-tracker/compare/9.2.0...9.2.1) (2023-03-15)


### Bug Fixes

* fixes clash with Default New Tab Page plugin ([ecafed0](https://github.com/valentine195/obsidian-initiative-tracker/commit/ecafed04ca9fd17a57d15e8ea83d1317f05e64ba))

## [9.2.0](https://github.com/valentine195/obsidian-initiative-tracker/compare/9.1.1...9.2.0) (2023-03-10)


### Features

* Enables Hit Dice rolling ([3698aee](https://github.com/valentine195/obsidian-initiative-tracker/commit/3698aeed3987622a094fb7f84867ddb582bab1b0))


### Bug Fixes

* Fixes broken Set Health/Status option in creature control ([57cd592](https://github.com/valentine195/obsidian-initiative-tracker/commit/57cd592d71cb0df282c99c66c1c12314c8076dfc))

### [9.1.1](https://github.com/valentine195/obsidian-initiative-tracker/compare/9.1.0...9.1.1) (2023-03-02)


### Bug Fixes

* AC can now be a string ([bfb8d87](https://github.com/valentine195/obsidian-initiative-tracker/commit/bfb8d87f20fddd92d380187d6393e1844f476ab9))

## [9.1.0](https://github.com/valentine195/obsidian-initiative-tracker/compare/9.0.3...9.1.0) (2023-03-01)


### Features

* adds Display Player HP Values setting ([0f93462](https://github.com/valentine195/obsidian-initiative-tracker/commit/0f9346293aaa4a48f8844c0a6398356f15862297))

### [9.0.3](https://github.com/valentine195/obsidian-initiative-tracker/compare/9.0.2...9.0.3) (2023-02-28)


### Bug Fixes

* init encounters to render in canvas blocks ([db65db6](https://github.com/valentine195/obsidian-initiative-tracker/commit/db65db60fe79efbbfc820dfb7da149d1ea349cf0))

### [9.0.2](https://github.com/valentine195/obsidian-initiative-tracker/compare/9.0.1...9.0.2) (2023-02-21)


### Bug Fixes

* encounters now roll initiative properly ([bc298c7](https://github.com/valentine195/obsidian-initiative-tracker/commit/bc298c7283f99da373f3100ac0ff295ffbfda2fd))

### [9.0.1](https://github.com/valentine195/obsidian-initiative-tracker/compare/9.0.0...9.0.1) (2023-02-21)


### Bug Fixes

* fix issue loading players from encounter row ([6e5ff54](https://github.com/valentine195/obsidian-initiative-tracker/commit/6e5ff54c923b5b91d83ee74cc53e5c111e19cb7a))

## [9.0.0](https://github.com/valentine195/obsidian-initiative-tracker/compare/8.1.8...9.0.0) (2023-02-14)


### ⚠ BREAKING CHANGES

* Rewrote the backend tracker store
* Encounter Builder functionality

### Features

* Encounter Builder functionality ([0419ecd](https://github.com/valentine195/obsidian-initiative-tracker/commit/0419ecd4c04b615b2431deffd02aa0fd92d0f6b4))
* Rewrote the backend tracker store ([373b365](https://github.com/valentine195/obsidian-initiative-tracker/commit/373b3655f25bd4a1f57d76cd5912bd82efc8216f))
* tracker rewrite complete ([87b0178](https://github.com/valentine195/obsidian-initiative-tracker/commit/87b017885fe82fd1c54ad870d88949110c0b65cd))


### Bug Fixes

* Add Creatures -> Add to Encounter ([0e628f9](https://github.com/valentine195/obsidian-initiative-tracker/commit/0e628f93368b5ae954da525dff17e7ae3f1292f4))
* adds "Add Creatures" to tracker context ([689e778](https://github.com/valentine195/obsidian-initiative-tracker/commit/689e77808c67033291239250fdb9b080cf52a3c1))
* combatant view works ([0b3fcd6](https://github.com/valentine195/obsidian-initiative-tracker/commit/0b3fcd6f9143147375bfea981cedd28c31458431))
* fix status entering ([c7f8994](https://github.com/valentine195/obsidian-initiative-tracker/commit/c7f8994ea139226bc64cb7aef1159980b42b7ae1))
* fixes accidentally import from leaflet ([a5b4892](https://github.com/valentine195/obsidian-initiative-tracker/commit/a5b4892b614f140b2cee77636a9168e3f30f0674))
* fixes creature re-use in encounter blocks ([6a66c9e](https://github.com/valentine195/obsidian-initiative-tracker/commit/6a66c9ef66e42a6d1e6907b6dbf617c348e4292f))
* hidden works again ([6d6e451](https://github.com/valentine195/obsidian-initiative-tracker/commit/6d6e451a190748c060c5b55b83fc221488d6fedc))
* margin around everything ([24d36c2](https://github.com/valentine195/obsidian-initiative-tracker/commit/24d36c24220e8cd2d867735ae639d37e03c42fd4))
* reset creature button works now ([8c5fe84](https://github.com/valentine195/obsidian-initiative-tracker/commit/8c5fe847160a8449e33420dc0c3d9f7d4fc67081))
* update packages ([1d11801](https://github.com/valentine195/obsidian-initiative-tracker/commit/1d11801ec0ff2b6ebcfe1384e9f4f5890a04eb6c))

### [11.0.5](https://github.com/valentine195/obsidian-initiative-tracker/compare/11.0.4...11.0.5) (2022-12-09)


### Bug Fixes

* fix status entering ([c7f8994](https://github.com/valentine195/obsidian-initiative-tracker/commit/c7f8994ea139226bc64cb7aef1159980b42b7ae1))

### [11.0.4](https://github.com/valentine195/obsidian-initiative-tracker/compare/11.0.3...11.0.4) (2022-12-04)


### Bug Fixes

* adds "Add Creatures" to tracker context ([689e778](https://github.com/valentine195/obsidian-initiative-tracker/commit/689e77808c67033291239250fdb9b080cf52a3c1))
* combatant view works ([0b3fcd6](https://github.com/valentine195/obsidian-initiative-tracker/commit/0b3fcd6f9143147375bfea981cedd28c31458431))
* hidden works again ([6d6e451](https://github.com/valentine195/obsidian-initiative-tracker/commit/6d6e451a190748c060c5b55b83fc221488d6fedc))
* margin around everything ([24d36c2](https://github.com/valentine195/obsidian-initiative-tracker/commit/24d36c24220e8cd2d867735ae639d37e03c42fd4))
* reset creature button works now ([8c5fe84](https://github.com/valentine195/obsidian-initiative-tracker/commit/8c5fe847160a8449e33420dc0c3d9f7d4fc67081))

### [11.0.3](https://github.com/valentine195/obsidian-initiative-tracker/compare/11.0.1...11.0.3) (2022-12-03)


### Bug Fixes

* Add Creatures -> Add to Encounter ([0e628f9](https://github.com/valentine195/obsidian-initiative-tracker/commit/0e628f93368b5ae954da525dff17e7ae3f1292f4))

### [11.0.2](https://github.com/valentine195/obsidian-initiative-tracker/compare/11.0.1...11.0.2) (2022-12-03)


### Bug Fixes

* Add Creatures -> Add to Encounter ([0e628f9](https://github.com/valentine195/obsidian-initiative-tracker/commit/0e628f93368b5ae954da525dff17e7ae3f1292f4))

### [11.0.1](https://github.com/valentine195/obsidian-initiative-tracker/compare/11.0.0...11.0.1) (2022-12-02)


### Bug Fixes

* update packages ([1d11801](https://github.com/valentine195/obsidian-initiative-tracker/commit/1d11801ec0ff2b6ebcfe1384e9f4f5890a04eb6c))

## [11.0.0](https://github.com/valentine195/obsidian-initiative-tracker/compare/8.1.4...11.0.0) (2022-12-02)


### Features

* tracker rewrite complete ([87b0178](https://github.com/valentine195/obsidian-initiative-tracker/commit/87b017885fe82fd1c54ad870d88949110c0b65cd))


### Bug Fixes

* fixes creature re-use in encounter blocks ([6a66c9e](https://github.com/valentine195/obsidian-initiative-tracker/commit/6a66c9ef66e42a6d1e6907b6dbf617c348e4292f))

## [10.0.0](https://github.com/valentine195/obsidian-initiative-tracker/compare/8.0.11...10.0.0) (2022-09-27)

### [9.0.1](https://github.com/valentine195/obsidian-initiative-tracker/compare/9.0.0...9.0.1) (2022-09-17)


### Bug Fixes

* fixes accidentally import from leaflet ([a5b4892](https://github.com/valentine195/obsidian-initiative-tracker/commit/a5b4892b614f140b2cee77636a9168e3f30f0674))

## [9.0.0](https://github.com/valentine195/obsidian-initiative-tracker/compare/8.0.10...9.0.0) (2022-09-17)


### ⚠ BREAKING CHANGES

* Encounter Builder functionality

### Features

* Encounter Builder functionality ([0419ecd](https://github.com/valentine195/obsidian-initiative-tracker/commit/0419ecd4c04b615b2431deffd02aa0fd92d0f6b4))

### [8.1.4](https://github.com/valentine195/obsidian-initiative-tracker/compare/8.1.3...8.1.4) (2022-11-17)


### Bug Fixes

* enables link events in rendered statblocks ([4668e88](https://github.com/valentine195/obsidian-initiative-tracker/commit/4668e88f59f2892f6f08fc73f95a268c3825668d))

### [8.1.3](https://github.com/valentine195/obsidian-initiative-tracker/compare/8.1.2...8.1.3) (2022-11-08)


### Bug Fixes

* creatures with display names display numbers properly ([8021c41](https://github.com/valentine195/obsidian-initiative-tracker/commit/8021c415c227304240deb2c11bf58fc284667992))
* fixes issues with adding creatures from ui ([9dc5e56](https://github.com/valentine195/obsidian-initiative-tracker/commit/9dc5e560ba84a2ddc41adc931c43dd02c3522c98))

### [8.1.1](https://github.com/valentine195/obsidian-initiative-tracker/compare/8.1.0...8.1.1) (2022-10-31)


### Bug Fixes

* fixes display of multiple creatures from encounter blocks ([ce3eb5e](https://github.com/valentine195/obsidian-initiative-tracker/commit/ce3eb5e9545c8ef4669e6b11fcb3c1815a67e469))

## [8.1.0](https://github.com/valentine195/obsidian-initiative-tracker/compare/8.0.11...8.1.0) (2022-10-27)


### Features

* adds statblock-link support ([@ebullient](https://github.com/ebullient) :) ) ([340eca1](https://github.com/valentine195/obsidian-initiative-tracker/commit/340eca18d20809b94488cb7e721c5962cf7489c8))

### [8.0.11](https://github.com/valentine195/obsidian-initiative-tracker/compare/8.0.10...8.0.11) (2022-09-26)


### Bug Fixes

* fixes accidentally import from leaflet ([a5b4892](https://github.com/valentine195/obsidian-initiative-tracker/commit/a5b4892b614f140b2cee77636a9168e3f30f0674))

## [9.0.0](https://github.com/valentine195/obsidian-initiative-tracker/compare/8.0.10...9.0.0) (2022-09-17)


### ⚠ BREAKING CHANGES

* Encounter Builder functionality

### Features

* Encounter Builder functionality ([0419ecd](https://github.com/valentine195/obsidian-initiative-tracker/commit/0419ecd4c04b615b2431deffd02aa0fd92d0f6b4))
* encounters generate unique creatures (close [#69](https://github.com/valentine195/obsidian-initiative-tracker/issues/69)) ([0a9c30d](https://github.com/valentine195/obsidian-initiative-tracker/commit/0a9c30dab40cf55fe4d260ff0d256dbefc9f74e5))
* Player view now shows display name (close [#64](https://github.com/valentine195/obsidian-initiative-tracker/issues/64)) ([c35bdce](https://github.com/valentine195/obsidian-initiative-tracker/commit/c35bdce5090f9847d32f87402bc4b4d5fb3b7784))

### [8.0.10](https://github.com/valentine195/obsidian-initiative-tracker/compare/8.0.9...8.0.10) (2022-09-15)


### Bug Fixes

* fixes monsters not rolling initiatives when starting a new encounter ([fd8bbdd](https://github.com/valentine195/obsidian-initiative-tracker/commit/fd8bbddf762bf1590aabb3031db9cec001ea5370))

### [8.0.9](https://github.com/valentine195/obsidian-initiative-tracker/compare/8.0.7...8.0.9) (2022-09-11)


### Bug Fixes

* fixes several encounter difficulty calculation issues ([0a53891](https://github.com/valentine195/obsidian-initiative-tracker/commit/0a5389130705fe1b665def87e6549f08a7122f05))

### [8.0.7](https://github.com/valentine195/obsidian-initiative-tracker/compare/8.0.6...8.0.7) (2022-08-21)


### Bug Fixes

* better yellow (thanks [@ebullient](https://github.com/ebullient)) ([732b05f](https://github.com/valentine195/obsidian-initiative-tracker/commit/732b05feb181adedb2c00ef6af922b3965e42ab7))

### [8.0.6](https://github.com/valentine195/obsidian-initiative-tracker/compare/8.0.5...8.0.6) (2022-08-18)


### Bug Fixes

* testing brat update ([9e224b4](https://github.com/valentine195/obsidian-initiative-tracker/commit/9e224b42137d26e8cf34a711e763730c7be07191))

### [8.0.5](https://github.com/valentine195/obsidian-initiative-tracker/compare/8.0.4...8.0.5) (2022-08-18)


### Bug Fixes

* try again..... for real this time ([2fd52cd](https://github.com/valentine195/obsidian-initiative-tracker/commit/2fd52cd0a32837c3447479c0c5550b78f0c87758))

### [8.0.4](https://github.com/valentine195/obsidian-initiative-tracker/compare/8.0.3...8.0.4) (2022-08-18)


### Bug Fixes

* try again... ([3183c60](https://github.com/valentine195/obsidian-initiative-tracker/commit/3183c60e379678c87b95e3559e2378372900c443))

### [8.0.3](https://github.com/valentine195/obsidian-initiative-tracker/compare/8.0.2...8.0.3) (2022-08-18)


### Bug Fixes

* try again on pipeline ([e56edc8](https://github.com/valentine195/obsidian-initiative-tracker/commit/e56edc8f87d9479fc102a41b55faac1b04fc6521))

### [8.0.2](https://github.com/valentine195/obsidian-initiative-tracker/compare/8.0.1...8.0.2) (2022-08-18)


### Bug Fixes

* fixes release pipeline (again) ([c7caada](https://github.com/valentine195/obsidian-initiative-tracker/commit/c7caadae31dec916722094ead2fd42e484cde07a))

### [8.0.1](https://github.com/valentine195/obsidian-initiative-tracker/compare/8.0.0...8.0.1) (2022-08-18)


### Bug Fixes

* fixes release pipeline ([4c90fb5](https://github.com/valentine195/obsidian-initiative-tracker/commit/4c90fb529dbd2c10d379417cdb68aa4561ac3e7b))

## [8.0.0](https://github.com/valentine195/obsidian-initiative-tracker/compare/7.6.4...8.0.0) (2022-08-18)


### Features

* Added a player view ([a7154ec](https://github.com/valentine195/obsidian-initiative-tracker/commit/a7154ec789ff62560afb4f8f2c4bac0e22931240))


### Bug Fixes

* Fixes issue where deleting the log file would cause errors ([7d91456](https://github.com/valentine195/obsidian-initiative-tracker/commit/7d9145681f624987bfbf7efc5c4be4fc5a478326))
* remove creature selection shortcut overload ([e0e2ab7](https://github.com/valentine195/obsidian-initiative-tracker/commit/e0e2ab7346dcbddd6aac0de31d957309e7a1822a)), closes [#57](https://github.com/valentine195/obsidian-initiative-tracker/issues/57)

## [7.7.0](https://github.com/valentine195/obsidian-initiative-tracker/compare/7.6.2...7.7.0) (2022-08-11)


### Features

* Combat logs ([f968e9a](https://github.com/valentine195/obsidian-initiative-tracker/commit/f968e9abc34e66f965e1ba335625fa4b13faca88))

## [7.7.0](https://github.com/valentine195/obsidian-initiative-tracker/compare/7.6.2...7.7.0) (2022-08-11)


### Features

* Combat logs ([f968e9a](https://github.com/valentine195/obsidian-initiative-tracker/commit/f968e9abc34e66f965e1ba335625fa4b13faca88))

## [7.6.3](https://github.com/valentine195/obsidian-initiative-tracker/compare/7.6.2...7.6.3) (2022-08-12)


### Bug Fixes

* No longer open combatant if Statblocks isn’t installed ([3cd88cb](https://github.com/valentine195/obsidian-initiative-tracker/commit/3cd88cb4b31fb87cd2844e6eb4c28b58eeb20649))

### [7.6.2](https://github.com/valentine195/obsidian-initiative-tracker/compare/7.6.1...7.6.2) (2022-08-10)


### Bug Fixes

* fixes issue with new selection methods ([1e75773](https://github.com/valentine195/obsidian-initiative-tracker/commit/1e7577322201f17cd17597a8ef1a796de240cdba))

### [7.6.1](https://github.com/valentine195/obsidian-initiative-tracker/compare/7.4.5...7.6.1) (2022-08-10)

### [7.4.5](https://github.com/valentine195/obsidian-initiative-tracker/compare/7.6.0...7.4.5) (2022-08-10)


### Bug Fixes

* improved multi-creature hp and status ux ([30de922](https://github.com/valentine195/obsidian-initiative-tracker/commit/30de9220ea4b5dc6c3f6b7afba2784ab860792af))

### [7.4.4](https://github.com/valentine195/obsidian-initiative-tracker/compare/7.4.3...7.4.4) (2022-06-09)


### Bug Fixes

* New encounters no longer add all players if a party is active (close [#41](https://github.com/valentine195/obsidian-initiative-tracker/issues/41)) ([f493ecf](https://github.com/valentine195/obsidian-initiative-tracker/commit/f493ecf3c92c0374a9a31276789fb036c6d4987a))

### [7.4.1](https://github.com/valentine195/obsidian-initiative-tracker/compare/7.4.0...7.4.1) (2022-03-22)


### Bug Fixes

* Fixes parsing of display names defined in inline arrays. ([a2ef280](https://github.com/valentine195/obsidian-initiative-tracker/commit/a2ef280db7e37c6832f6dcca784632707a8be962))

## [7.4.0](https://github.com/valentine195/obsidian-initiative-tracker/compare/7.3.4...7.4.0) (2022-03-22)


### Features

* Can now specify display name for creatures in encounter blocks ([b14acc4](https://github.com/valentine195/obsidian-initiative-tracker/commit/b14acc46cbd5c9677774848148b18f2f2f6fe2da))

### [7.3.4](https://github.com/valentine195/obsidian-initiative-tracker/compare/7.3.3...7.3.4) (2022-03-21)


### Bug Fixes

* Wrap encounter table lists in ul ([d9edf7c](https://github.com/valentine195/obsidian-initiative-tracker/commit/d9edf7c3342d992d67a6838285e280029d9e2538))

### [7.3.3](https://github.com/valentine195/obsidian-initiative-tracker/compare/7.3.2...7.3.3) (2022-03-21)


### Bug Fixes

* Encounter Tables now display as a list + have the `encounter-creatures`, `encounter-players` and `encounter-list` CSS classes ([706e7cc](https://github.com/valentine195/obsidian-initiative-tracker/commit/706e7ccbfac2b7eb5041fd5338dc51121b166c8e))

### [7.3.2](https://github.com/valentine195/obsidian-initiative-tracker/compare/7.3.1...7.3.2) (2022-03-07)


### Bug Fixes

* Release was buggy ([c8d3413](https://github.com/valentine195/obsidian-initiative-tracker/commit/c8d34133f9bd258ac089bb01a9d1158bb1e22fb7))

## [7.3.0](https://github.com/valentine195/obsidian-initiative-tracker/compare/7.2.2...7.3.0) (2022-03-04)


### Features

* Can now specify players and party separately (close [#31](https://github.com/valentine195/obsidian-initiative-tracker/issues/31)) ([113a78c](https://github.com/valentine195/obsidian-initiative-tracker/commit/113a78c124a448c6fc6f4f20a7f796fbe82ec569))
* Player names in the tracker are now bolded and receive the `.player` class ([8ff9ab3](https://github.com/valentine195/obsidian-initiative-tracker/commit/8ff9ab34b083ef6374cc96876397c4f518a21e52))

### [7.2.2](https://github.com/valentine195/obsidian-initiative-tracker/compare/7.2.1...7.2.2) (2022-03-03)


### Bug Fixes

* Fixes issue where switching a party in the tracker wouldn't allow parties to be loaded from encounters ([9940382](https://github.com/valentine195/obsidian-initiative-tracker/commit/994038243738b162b7f951058cbce90a038a2956))

### [7.2.1](https://github.com/valentine195/obsidian-initiative-tracker/compare/7.2.0...7.2.1) (2022-02-22)


### Bug Fixes

* update some settings descriptions ([ee33a40](https://github.com/valentine195/obsidian-initiative-tracker/commit/ee33a405277b3f9d09422f6dd5a62b1dc7b75698))

## [7.2.0](https://github.com/valentine195/obsidian-initiative-tracker/compare/7.1.0...7.2.0) (2022-02-22)


### Features

* Adds monster display names (close [#28](https://github.com/valentine195/obsidian-initiative-tracker/issues/28)) ([3b8c0de](https://github.com/valentine195/obsidian-initiative-tracker/commit/3b8c0de80a02fbcc8392ee21a656d274af1f87bf))
* Adds Parties to settings ([353a27d](https://github.com/valentine195/obsidian-initiative-tracker/commit/353a27df5813a8641112523f95756adc2afbfb8b))
* Implements custom status effects ([8d204a5](https://github.com/valentine195/obsidian-initiative-tracker/commit/8d204a5caa9fa75b94ba20ce7c95c344096645e3))
* Players linked to notes will now update their hp, ac, modifier, and level ([648145c](https://github.com/valentine195/obsidian-initiative-tracker/commit/648145c45170dd81145a828fc2e0d27cbf55fd89))


### Bug Fixes

* fixes styling issues with settings tab ([44a7407](https://github.com/valentine195/obsidian-initiative-tracker/commit/44a7407d55afa669965fd62aaaab8a6538a8e59a))

## [7.1.0](https://github.com/valentine195/obsidian-initiative-tracker/compare/7.0.0...7.1.0) (2022-01-26)


### Features

* can now right click monsters for context menu ([1fef354](https://github.com/valentine195/obsidian-initiative-tracker/commit/1fef354ea08d1b35fae31d258690525ab31d793a))


### Bug Fixes

* fixes issue with deleting active monster not going to next ([8ee9d09](https://github.com/valentine195/obsidian-initiative-tracker/commit/8ee9d09fd0640dcc0ff9e5279e4d08a0e81e9b31))

## [7.0.0](https://github.com/valentine195/obsidian-initiative-tracker/compare/6.0.1...7.0.0) (2022-01-22)


### ⚠ BREAKING CHANGES

* removes homebrew monster support (homebrew is now managed solely by TTRPG statblocks)

### Features

* removes homebrew monster support (homebrew is now managed solely by TTRPG statblocks) ([6aded50](https://github.com/valentine195/obsidian-initiative-tracker/commit/6aded5072a1f712a97fbffb0957d2656d8bb2c77))


### Bug Fixes

* fixes issue where clicking a creature name will reset its name (close [#24](https://github.com/valentine195/obsidian-initiative-tracker/issues/24)) ([6c07566](https://github.com/valentine195/obsidian-initiative-tracker/commit/6c0756608d875926676e5f89605d48d637290d90))

### [6.0.1](https://github.com/valentine195/obsidian-initiative-tracker/compare/6.0.0...6.0.1) (2022-01-20)


### Bug Fixes

* removed console logs ([2b07d78](https://github.com/valentine195/obsidian-initiative-tracker/commit/2b07d78429ad637c2a4e3dce8f2df435e87a241a))

## [6.0.0](https://github.com/valentine195/obsidian-initiative-tracker/compare/5.3.1...6.0.0) (2022-01-20)


### ⚠ BREAKING CHANGES

* Removed homebrew creatures. Homebrew creatures are now manages solely through 5e Statblocks.

### Features

* Removed homebrew creatures. Homebrew creatures are now manages solely through 5e Statblocks. ([12c374b](https://github.com/valentine195/obsidian-initiative-tracker/commit/12c374bf9d1a04e4fa939a44e70044b5a51b0033))

### [5.3.1](https://github.com/valentine195/obsidian-initiative-tracker/compare/5.3.0...5.3.1) (2022-01-13)


### Bug Fixes

* remove logs ([76ded72](https://github.com/valentine195/obsidian-initiative-tracker/commit/76ded72198778b4daa0259123f06ff98faeb8f36))

## [5.3.0](https://github.com/valentine195/obsidian-initiative-tracker/compare/5.2.0...5.3.0) (2022-01-13)


### Features

* add encounter line post processor ([eb98ea9](https://github.com/valentine195/obsidian-initiative-tracker/commit/eb98ea90ad01838ba633a3c2e041320d2bcbda7a))
* add round number display to tracker (close [#23](https://github.com/valentine195/obsidian-initiative-tracker/issues/23)) ([59e13e5](https://github.com/valentine195/obsidian-initiative-tracker/commit/59e13e512ce32990327c7633157667a786e8b62c))


### Bug Fixes

* Update release notes message ([66c7ed3](https://github.com/valentine195/obsidian-initiative-tracker/commit/66c7ed361c6b0c12fd1ebd501b645d2c1a45cc2d))

## [5.2.0](https://github.com/valentine195/obsidian-initiative-tracker/compare/5.1.2...5.2.0) (2022-01-12)


### Features

* added encounter table postprocessor ([1cc96c9](https://github.com/valentine195/obsidian-initiative-tracker/commit/1cc96c92dd7e2509518193baba7c1425d8015777))

### [5.1.2](https://github.com/valentine195/obsidian-initiative-tracker/compare/5.1.1...5.1.2) (2021-12-23)


### Bug Fixes

* fixed issue with custom statuses breaking view loading ([0b5b95d](https://github.com/valentine195/obsidian-initiative-tracker/commit/0b5b95d62466497df5ee1a01d5bbabb2e02364df))

### [5.1.1](https://github.com/valentine195/obsidian-initiative-tracker/compare/5.1.0...5.1.1) (2021-12-22)


### Bug Fixes

* encounter name now clears on new encounter ([39889c4](https://github.com/valentine195/obsidian-initiative-tracker/commit/39889c46c10343fe6dbe332d6d851df273aa5a8f))

## [5.1.0](https://github.com/valentine195/obsidian-initiative-tracker/compare/5.0.3...5.1.0) (2021-12-22)


### Features

* can now save and load encounter states ([7085303](https://github.com/valentine195/obsidian-initiative-tracker/commit/708530342040ae1bf4be44276c483d4d5005e023))
* initiative tracker now displays creature count ([e73e9cd](https://github.com/valentine195/obsidian-initiative-tracker/commit/e73e9cd9edff5a8c5fcbfa2cb6be5134dafd1dfb))


### Bug Fixes

* clicking a creature name now opens the creature statblock ([31917c1](https://github.com/valentine195/obsidian-initiative-tracker/commit/31917c193e960d33c74a21125062bf642a170aeb))

### [5.0.3](https://github.com/valentine195/obsidian-initiative-tracker/compare/5.0.2...5.0.3) (2021-12-14)


### Bug Fixes

* removed logs ([a9fc9d2](https://github.com/valentine195/obsidian-initiative-tracker/commit/a9fc9d262e96f5809581858851ab6e5e01464c14))

### [5.0.2](https://github.com/valentine195/obsidian-initiative-tracker/compare/5.0.1...5.0.2) (2021-12-14)


### Bug Fixes

* added global condense setting in Settings ([56df12a](https://github.com/valentine195/obsidian-initiative-tracker/commit/56df12af7de3ba45ee16567d68c74a63d2497ef7))

### [5.0.1](https://github.com/valentine195/obsidian-initiative-tracker/compare/5.0.0...5.0.1) (2021-12-14)


### Bug Fixes

* update TTRPG statblocks name ([d7b098b](https://github.com/valentine195/obsidian-initiative-tracker/commit/d7b098b47e4a193755b03379c389bf4a30245831))

## [5.0.0](https://github.com/valentine195/obsidian-initiative-tracker/compare/4.0.1...5.0.0) (2021-12-14)


### Features

* add amounts of creatures ([9e8b304](https://github.com/valentine195/obsidian-initiative-tracker/commit/9e8b304a5e2eacacbe04a84106b8ea5f26aa2e8b))
* Added ability to view creature ([110ed81](https://github.com/valentine195/obsidian-initiative-tracker/commit/110ed815e61dc7b735a4ca61a4fe40684cc6f042))
* added dice rollable monsters in encounter block (requires dice roller plugin) ([bfba23f](https://github.com/valentine195/obsidian-initiative-tracker/commit/bfba23fd8040c8f8e7bd097042deda5b1f16f5e0))
* Monsters can now be drag-and-dropped to change initiative order ([5af7f4f](https://github.com/valentine195/obsidian-initiative-tracker/commit/5af7f4f8af54727af1a7468e8799d21d0171dcd0))
* Monsters can now roll initiatives together ([79a9a86](https://github.com/valentine195/obsidian-initiative-tracker/commit/79a9a86139c477bd5eb684bfedc8a19664d379b3))
