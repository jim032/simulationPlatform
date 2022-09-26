import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
var store = new Vuex.Store({
	state: {
  	
  	socketUrl:'ws://192.168.1.167:8081/webSocket/',

  	 //节点未开始提示
  	node_noStart:'You have not yet dragged the node',
  	//节点未启动状态的提示
  	node_noFinsh:'Not finished yet, please try again later!',
  	//节点启动7s的每秒状态
    node_sta1:'The node is starting',
    node_sta2:'Verification of Genesis block completed',
    node_sta3:'Generation of Chuangshi block completed',
    node_sta4:'P2P network initialization completed',
    node_sta5:'Initialization of built-in contract completed',
    node_sta6:'RPC interface initialization complete',
    node_sta7:'Node started successfully',
    //节点7s启动完成显示状态 
    node_sta8:'The node status is normal',   
    //节点刚开始启动的提示步骤
    node_start:'Node starting, wait for four nodes to start, please follow the steps on the right to proceed to the next step.',
    //四个节点启动完成的提示
    node_finsh:'The current node has all been started, please press the right to proceed to the next step.',
    
    node_stepTips: [ //节点步骤提示
				 {
				 	  step: 1,
						infolist: ['1. Click the left toolbox drag button to drag the node to the central console.', 
						'2. Click the current node / block to view the specific parameter information of the node / block from the bottom status bar.', 
						'3. Continue to drag nodes until all four nodes are placed.']
					},
					{
						step: 2,
						infolist: ['1. Click the block button in the left toolbox to block the node.',
						'2. Waiting for each node to calculate the difficulty, the winning node will get the block qualification.', 
						'3. After block output, click new block (block 1) to view relevant parameter information from the bottom status bar.']
					},
					{
						step: 3,
						infolist: ['1. Click the broadcast button in the left toolbox to broadcast the node.',
						'2. Waiting for the winning node to pack the new block and broadcast it to other nodes.',
						'3. Click any block being broadcasted to view the specific parameters, and compare with the winning node block 1 to see whether the information is consistent and whether it has been tampered in the broadcasting process.'
						]
					},
					{
						step: 4,
						infolist: ['1. The node simulation run has ended',
						'2. The user can click Reset in the upper right corner to operate again, or return to the main interface to select other chapters.'
						]
					}
					
		],
		
		//多人发币步骤提示
		sm_multiple_stepTips:[
		   {step:1,infolist:[
		   	'1. Currently, the number of people online does not reach 4. You can click Add robot in the tool on the left to add the number of people online.',
		    '2. Click user to view the specific parameter information of current user.']
		   },
		   {step:2,infolist:['1. Prompt the user to click the setting button in the tool on the left to set the currency.','2. After prompting the user to set the currency, click set user to view some information of the users new currency in the bottom status bar.']},
		  {step:3,
		  	infolist:['1.Prompt the user to drag the deployment button in the tool on the left to deploy the contract.',
		  	'2. Wait for the deployment of the contract.',
		  	'3. After the contract is deployed, check the specific parameters of the contract in the status bar below']
		  },
		  {step:4,
		  	infolist:['1. Please click the transfer button below the initial owner user to transfer.',
		  	'2. Click the transfer target user to view the parameter information after transfer in the status bar below.']
		  }
		],
		
		//发币步骤提示
		sm_stepTips:
		[//步骤提示
		  {step:1,infolist:['1. Click the left toolbox drag button to drag the user to the central console.','2. Click the user to view the specific parameter information of the current user.','3. Continue to drag users until all four users are installed.']},
		  {step:2,infolist:['1. Click the currency setting button in the left toolbox to set the currency initially.','2. After setting the currency, you can click the initial owners portrait to view the latest currency holding information of the user in the status bar at the bottom.']},
		  {step:3,
		  	infolist:['1. Click the deployment button in the toolbox on the left to deploy the smart transfer contract.',
		  	'2. After the smart contract is deployed, you can view the specific parameter information of the contract from the bottom status bar.']
		  	
		  },
		  {step:4,
		  	infolist:['1. Please click the transfer button under "initial owner" to initiate transfer operation to any other user',
		  	'2. Click the transfer object to view the users holding information after receiving the transfer from the status bar.','3、Continuous transfer between users can be carried out.']
		  }
		],
		
		hash_stepTips:
		[//步骤提示
		  {step:0,infolist:
	  	  ['1. Click the "generate hash" button in the left toolbox to generate hash value for "file a" through hash calculation.',
	  	    '2. Click "file A" to view the generated hash value.',
	  	  ]
		  },
		  {step:1,infolist:
	  	  ['1. Click the "generate hash" button in the left toolbox to generate hash value for "file a" through hash calculation.',
	  	    '2. Click "file A" to view the generated hash value.',
	  	  ]
		  },
		  {step:2,infolist:
	  	  ['1.Click the "send" button in the left toolbox and select "attack" or "no attack" in the new pop-up box.',
	  	    '2. Click "file A" to view the generated hash value.',
	  	  ]
		  },
		  {step:31,infolist:
	  	  ['1.After "user B" receives the file, click the "check" button to check the file.',
	  	    '2.Click "file A" and "file B" respectively to check the hash value.',
	  	  ]
		  },
		  {step:32,infolist:
	  	  ['1.Hash algorithm simulation ended',
	  	   '2.The user can click Reset in the upper right corner to operate again, or return to the main interface to select another chapter.'
	  	  ]
		  },
		  {step:33,infolist:
	  	  ['1.After "user B" receives the file, click "verify" button to verify the file.',
	  	    '2.Click "file A" and "file B" respectively to check the hash value.',
	  	   
	  	  ]
		  },
		  {step:34,infolist:
	  	  ['1.Hash algorithm simulation ended',
	  	   '2.The user can click Reset in the upper right corner to operate again, or return to the main interface to select another chapter.'
	  	  ]
		  },
		 
		],
		
		//椭圆线
		ecc__stepTips:[
		  {step:1,infolist:['1. Click the "generate hash" button in the left toolbox, and try to generate an ellipse by changing the values of a and B. The public key and the private key are obtained by the addition of ellipse points.',
		   '2. Click users a, B and C to view the public key and private key.']
		  },
		  {step:2,infolist:['1.Click the "send" button in the left toolbox to transmit the data encrypted by user a through user Bs public key to user B.',
		   '2.Wait for the data transmission to complete, and click to view the status of user C.']
		  },
		  {step:3,infolist:['1.Click the "parse" button in the left toolbox to parse the data received by user B.',
		   '2.Wait for the data transmission to complete, and click to view the status of user B.']
		  },
		  {step:4,infolist:['1.Click the "parse" button in the left toolbox to parse the data received by user B.',
		   '2.Wait for the data transmission to complete, and click to view the status of user B.']
		  }
		 ],
		
		//对称加密
		encrAlgorithm_stepTips:[{step:1,infolist:['1. Click the encryption button in the left toolbox to encrypt a string of data using symmetric key algorithm.',
		'2. Click the decryption button in the left toolbox to decrypt the encrypted data with the same key']}],
		//keystore
		keyStore_stepTips:[{step:1,infolist:['1. Please follow the steps on the page.']}], 
		
		data_stepTips:[{step:1,infolist:['1. Click the block icon to view the data structure of the block']}],
		
		s_medicalCare:[
		  {step:1,infolist:[
		  	'1. Click any hospital in a, B, C to link the patient information and generate hash.',
		  	'2. If the patient information is uploaded successfully, the patient will be authorized to open to this hospital by default. After entering the patient page, we can change the authorization or open the authorization to other hospitals.',
		  	'3. Click any hospital for patient information query. If it cannot be operated, it needs to be authorized by the "patient".'
		  ]
		  },
		  
		],
		
		s_copyRight:[
		  {step:1,infolist:[
		  	'1. Click the registrant page to fill in the copyright information, and generate hash on the certificate chain.',
		  	'2. Click the "publishing house" section in the page to confirm the information content again and store the certificate on the chain.',
		  	'3. In the main interface, click registrant and publisher respectively to query the corresponding hash.',
		  	'4. Click to enter the verification office and enter the registered person hash to query the copyright details'
		    ]
		  }
		],
		
		s_donation:[
		  {step:1,infolist:[
		  	'1. Click on the "donor" section of the page to register the donor information.',
		  	'2. Click the "Red Cross" section in the page to confirm the information content and store the certificate on the chain.',
		  	'3. Click the "donor" and "Red Cross" plates respectively to view the hash value after the card is stored on the chain.',
		  	'4. Click "beneficiary" in the page and enter the registered hash value to query.'
		    ]
		  }
		],
		s_logistics:[
		  {step:1,infolist:[
		  	'1. Click the sender, input the sending information, and generate the hash on the card chain.',
		  	'2. Click the collection point to input the order information and generate the hash on the certificate chain.',
		  	'3. Click logistics to query the logistics information and get the hash.',
		  	'4. In the main interface, click sender, collection point and logistics to query the corresponding hash.',
		  	'5. Click the recipient and enter the mail to query the logistics details.'
		    ]
		  }
		],
		s_finance:[
		  {step:1,infolist:[
		  	'1. Click on the supplier to provide financing and supply contract information, and generate hash on the certificate chain.',
		  	'2. Click on core enterprises. The information provided by the supplier is supported by the core enterprise and put on the chain.',
		  	'3. In the main interface, click supplier and core enterprise respectively to query the corresponding hash.',
		  	'4. Click bank and enter supplier hash to query financing details.',
		    ]
		  }
		],
		s_insurance:[
		  {step:1,infolist:[
		  	'1. Click individual user to fill in the policy information of aviation delay insurance to apply for claim settlement, and generate hash on the certificate chain.',
		  	'2. Click on the airline to prove the flight delay.',
		  	'3. In the main interface, click individual user and airline respectively to query the corresponding hash.',
		  	'4. Click the insurance company page, input the individual user hash, query the details of the policy and flight, and confirm the claim.',
		    ]
		  }
		],
		//异常篇步骤提示
		a_51attack:[
		  {step:1,infolist:[
		  	'1. Click the portraits of miners a, B and C to view their initial balance from the status bar at the bottom.',
		  	'2. Click the transfer button in the left toolbox to launch three consecutive transfer transactions.',
		  	'3. Click a, B and C again to view the balance change from the bottom status bar.',		  	
		    ]
		  },
		 
		  {step:2,infolist:[
		  	'1. Click the "increase calculation force" button on the left toolbar to select a miner to increase calculation force.',
		  	'2. Select a transaction in the bottom status bar to delete.',
		    ]
		  },
		  {step:3,infolist:[
		  	'1. Click the package button in the toolbox on the left to package the transaction.',
		  	'2. After packing, click a, B, C again to view the balance from the bottom status bar, and observe the balance changes before and after packing.',
		    ]
		  },
		  
		  {step:12,infolist:[
		  	'1. Please click the withdrawal button in the page to operate.',
		  	'2. Please note the change of balance in the page',
		    ]
		  }
		],
		//a-智能合约部署与漏洞
		a_smartLoophole:[{step:1,infolist:['1. Please click the withdrawal button in the page to operate.','2. Please note the change of balance in the page']}],
		//异常篇—-重放攻击
		a_replayAttack:[
		  {step:1,infolist:['1. Click the transfer button in the left toolbox to set the transfer information in the pop-up box.']},
		  {step:2,infolist:['1. Click the broadcast button in the left toolbox to broadcast the transfer transaction (but it is not packaged into the chain)）',
        '2. Wait for the transaction to be broadcast, and generate a new block when the broadcast ends']
		  },
		  {step:3,infolist:['1. Click the capture button in the toolbox on the left to operate "hacker" to intercept the newly generated transfer transaction.',
        '2. Wait for the successful interception.']
		  },
		  {step:4,infolist:['1. Click the broadcast button in the left toolbox to broadcast the transaction intercepted by the hacker on the forked chain.',
        '2. Wait for the broadcast to succeed.']
		  },
		  {step:5,infolist:['1. Click the package button in the toolbox on the left to package the two newly generated blocks on their respective chains.',
        '2. Wait for the packaging to finish.']
		  },
		  {step:12,infolist:['1. Click the package button in the toolbox on the left to package the two newly generated blocks on their respective chains.',
        '2. Wait for the packaging to finish.']
		  }
		],
		//异常-长程攻击
		a_longRangAttack:[{step:1,infolist:[
		  	'1. Wait for chain A to generate block 1.',
        '2. Click the attack button in the left toolbox to attack a chain, and the attacker will create a B chain branch.',
        '3. Wait for chain B to block.',
        '4. Click the overlay button in the toolbox on the left.'
		  ]}],
		//异常-交易延展性
		a_malleabilityAttack:[
		  {step:1,infolist:['1. Click the avatars of users A, B and C to view their initial balance from the bottom status bar.','2. Click the transfer button in the left toolbox to launch two consecutive transfer transactions.']},
		  {step:2,infolist:['1. Click the Modify button in the toolbox on the left to modify the transactions that are not packaged into blocks as required.','2. View the transaction status from the bottom status bar.']},
		  {step:3,infolist:['1. Click the package button in the toolbox on the left to package the transaction.',
		    '2. View the transaction status from the bottom status bar.',
		    '3. Click users A, B and C again to view the balance changes and transaction results from the bottom status bar.'
		    ]
		 },
		 {step:4,infolist:['1. Click the package button in the toolbox on the left to package the transaction.',
		    '2. View the transaction status from the bottom status bar.',
		    '3. Click users A, B and C again to view the balance changes and transaction results from the bottom status bar.'
		    ]
		 },
		  {step:12,infolist:['1. Click the package button in the toolbox on the left to package the transaction.',
		    '2. View the transaction status from the bottom status bar.',
		    '3. Click users A, B and C again to view the balance changes and transaction results from the bottom status bar.'
		    ]
		  }
		],
		a_softfork:[{step:1,infolist:['1. Click the upgrade button on the page to start the block.','2. The blocks of the new rule are displayed on a chain by the original chain']}],
    a_hardfork:[{step:1,infolist:['1. Click the upgrade button on the page to start the block.','2. The new rule blocks are not compatible with the old rule blocks, forming a new chain']}]
  },
  mutations: {
  
  },
  getters: {
    getNum (state) {
      return state.num
    }
  },
  mutations: {
    add (state, value) {
      state.num = value
    }
  }
})


export default store 
