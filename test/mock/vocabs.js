'use strict';

angular.module('mockedFeed', [])
  .value('defaultJSON', {
					"A1" : ["A1",
							"K\u00f6rperteile; Was tut dir\/Ihnen weh? Mir tut\/tun... weh",
							"Mein\/e ... tut\/tun weh"
					],
					"A2" : ["A2",
							"Rock",
							"Kleid"
					], 
					"B1" : ["Stiefmutter\/-tochter",
							"gestresst sein = Stress haben = unter STress\/Druck stehen vs. stressig sein",
							"sich etwas w\u00fcnschen"
					],
					"B2" : ["erfreut sein = sich freuen \u00fcber",
							"sauer sein auf = ver\u00e4rgert sein \u00fcber",
							"selbstst\u00e4ndig vs. angestellt"
					]
	});