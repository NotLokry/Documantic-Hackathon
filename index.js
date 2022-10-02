const Discord = require("discord.js")

function createEmbed(){
    try{
        const embed = new Discord.EmbedBuilder()
        this.setAuthor = function setAuthor(author){
            return embed.setAuthor(author)
        }
        this.setTitle = function setTitle(title){
            return embed.setTitle(title)
        }
        this.setURL = function setURL(url){
            return embed.setURL(url)
        }
        this.setDescription = function setDescription(description){
            return embed.setDescription(description)
        }
        this.setImage = function setImage(image){
            return embed.setImage(image)
        }
        this.setThumbnail = function setThumbnail(thumbnail){
            return embed.setThumbnail(thumbnail)
        }
        this.addFields = function addFields(fields){
            return embed.addFields(fields)
        }
        this.setFooter = function setFooter(footer){
            return embed.setFooter(footer)
        }
        this.setTimestamp = function setTimestamp(timestamp){
            return embed.setTimestamp(timestamp)
        }
        this.setColor = function setColor(color){
            return embed.setColor(color)
        }
        return embed
    }catch(err){
        return err
    }
}
function createActionRow(){
    try{
        const row = new Discord.ActionRowBuilder()
        this.addComponents = function addComponents(color){
            return row.addComponents(color)
        }
        return row
    }catch(err){
        return err
    }
}
function createButton(){
    try{
        const button = new Discord.ButtonBuilder()
        this.setCustomId = function setCustomId(customId){
            return button.setCustomId(customId)
        }
        this.setDisabled = function setDisabled(disabled){
            return button.setDisabled(disabled)
        }
        this.setEmoji = function setEmoji(emoji){
            return button.setEmoji(emoji)
        }
        this.setLabel = function setLabel(label){
            return button.setLabel(label)
        }
        this.setStyle = function setStyle(style){
            if(style == "DANGER")style = 4
            else if(style == "SUCCESS")style = 3
            else if(style == "SECONDARY")style = 2
            else if(style == "PRIMARY")style = 1
            else if(style == "LINK")style = 5
            return button.setStyle(style)
        }
        this.setURL = function setURL(url){
            return button.setURL(url)
        }
        return button
    }catch(err){
        return err
    }
}
async function Tetris(message){
		let size = 18
		let rotated = 0
		let backgroundEmoji = "⬛"
		let places = []
		let currentBlockType = undefined
		let abc = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
		function CreateBoard(places,size,backgroundEmoji){
			if(!size || size == null)return console.error("Please mention the size");
			if(isNaN(size))return console.error("Please mention the size in numbers");
			// if(size <= 2 || size >= 10)return console.error("Size can only be between 3-9");
			let amount = size
			let abc = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
			let abcs = []
			for(let i = 0; i < amount ; i++){
				abcs.push(abc[i])
			}
			amount = amount+1
			abcs.forEach(letter => {
				for(let i = 1; i < 11 ; i++){
					places.push({emoji:`${backgroundEmoji}`,name:`${letter}${i}`,floating:false,landed:false})
				}
			})
		}
		function CreateBlocks(places,backgroundEmoji){
			/**
			 * @param {Array} places
			*/
			const forms = ["o","i",'s','z','j','l']
			const type = forms[Math.floor(Math.random() * forms.length)]
			let spawnArea = places.filter(place => place.emoji === `${backgroundEmoji}` && place.name.slice(0,1) == "a" && Number(place.name.slice(1)) >=2 && Number(place.name.slice(1)) <= 8)
			let blockSpawn = spawnArea[Math.floor(Math.random() * spawnArea.length)]
			if(type == "i"){
				// I form
				if(!places || places.length <= 0 || places === null)return console.error("Please mention 'Places' where the player could be created");
				if(!backgroundEmoji)backgroundEmoji = "⬛"
				let block = []
				for(let i=0;i<4;i++){
					block.push(places.filter(place => place.name.slice(1) === blockSpawn.name.slice(1))[i])
				}
				for(let i=0;i<block.length;i++){
					block[i].emoji = `🟫`
					block[i].floating = true
					currentBlockType = "i"
				}
			}
			if(type == "o"){
				// O form
				if(!places || places.length <= 0 || places === null)return console.error("Please mention 'Places' where the player could be created");
				if(!backgroundEmoji)backgroundEmoji = "⬛"
				let block = []
				for(let i=0;i<2;i++){
					block.push(places.filter(place => place.name.slice(1) === blockSpawn.name.slice(1))[i])
					block.push(places.filter(place => Number(place.name.slice(1)) === Number(blockSpawn.name.slice(1))+1)[i])
				}
				for(let i=0;i<block.length;i++){
					block[i].emoji = `🟨`
					block[i].floating = true
					currentBlockType = "o"
				}
			}
            if(type == "s"){
				// S form
				if(!places || places.length <= 0 || places === null)return console.error("Please mention 'Places' where the player could be created");
				if(!backgroundEmoji)backgroundEmoji = "⬛"
				let block = []
				for(let i=0;i<2;i++){
                    block.push(places.filter(place => place.name.slice(0,1) === blockSpawn.name.slice(0,1)
                    )[Number(places.filter(place => place.name.slice(1) === blockSpawn.name.slice(1))[0].name.slice(1))+i])
                    block.push(places.filter(place => place.name.slice(0,1) === "b"
                    )[Number(places.filter(place => place.name.slice(1) === blockSpawn.name.slice(1))[0].name.slice(1))-i])
				}
				for(let i=0;i<block.length;i++){
					block[i].emoji = `🟩`
					block[i].floating = true
					currentBlockType = "s"
				}
			}
            if(type == "z"){
				// Z form
				if(!places || places.length <= 0 || places === null)return console.error("Please mention 'Places' where the player could be created");
				if(!backgroundEmoji)backgroundEmoji = "⬛"
				let block = []
				for(let i=0;i<2;i++){
                    block.push(places.filter(place => place.name.slice(0,1) === blockSpawn.name.slice(0,1)
                    )[Number(places.filter(place => place.name.slice(1) === blockSpawn.name.slice(1))[0].name.slice(1))-i])
                    block.push(places.filter(place => place.name.slice(0,1) === "b"
                    )[Number(places.filter(place => place.name.slice(1) === blockSpawn.name.slice(1))[0].name.slice(1))+i])
				}
				for(let i=0;i<block.length;i++){
					block[i].emoji = `🟥`
					block[i].floating = true
					currentBlockType = "z"
				}
			}
            if(type == "j"){
				// J form
				if(!places || places.length <= 0 || places === null)return console.error("Please mention 'Places' where the player could be created");
				if(!backgroundEmoji)backgroundEmoji = "⬛"
				let block = []
                for(let i=0;i<3;i++){
					block.push(places.filter(place => place.name.slice(1) === blockSpawn.name.slice(1))[i])
				}
				for(let i=0;i<1;i++){
                    block.push(places.filter(place => place.name.slice(0,1) === "c"
                    )[Number(places.filter(place => place.name.slice(1) === blockSpawn.name.slice(1))[0].name.slice(1))-2])
				}
				for(let i=0;i<block.length;i++){
					block[i].emoji = `🟦`
					block[i].floating = true
					currentBlockType = "j"
				}
			}
            if(type == "l"){
				// L form
				if(!places || places.length <= 0 || places === null)return console.error("Please mention 'Places' where the player could be created");
				if(!backgroundEmoji)backgroundEmoji = "⬛"
				let block = []
                for(let i=0;i<3;i++){
					block.push(places.filter(place => place.name.slice(1) === blockSpawn.name.slice(1))[i])
				}
				for(let i=0;i<1;i++){
                    block.push(places.filter(place => place.name.slice(0,1) === "c"
                    )[Number(places.filter(place => place.name.slice(1) === blockSpawn.name.slice(1))[0].name.slice(1))])
				}
				for(let i=0;i<block.length;i++){
					block[i].emoji = `🟧`
					block[i].floating = true
					currentBlockType = "l"
				}
			}
			if(type == "t"){
				// T form
				if(!places || places.length <= 0 || places === null)return console.error("Please mention 'Places' where the player could be created");
				if(!backgroundEmoji)backgroundEmoji = "⬛"
				let block = []
                for(let i=0;i<2;i++){
					block.push(places.filter(place => place.name.slice(0,1) === "b"
					)[
						Number(
							places.filter(place => 
								Number(place.name.slice(1)) === Number(blockSpawn.name.slice(1))
							)[0].name.slice(1)
						)+i
					])
				}
				for(let i=0;i<2;i++){
					block.push(places.filter(place => place.name.slice(0,1) === "b"
					)[
						Number(
							places.filter(place => 
								Number(place.name.slice(1)) === Number(blockSpawn.name.slice(1))
							)[0].name.slice(1)
						)-i
					])
				}
				for(let i=0;i<1;i++){
                    block.push(places.filter(place => place.name.slice(0,1) === "a"
                    )[Number(places.filter(place => place.name.slice(1) === blockSpawn.name.slice(1))[0].name.slice(1))])
				}
				for(let i=0;i<block.length;i++){
					block[i].emoji = `🟪`
					block[i].floating = true
					currentBlockType = "t"
				}
			}
		}
		function CreateGame(places,amount){
			let board = ''
			places.forEach(place => {
				if(Number(place.name.slice(1)) === 10){board += `${place.emoji}\n`}else{board += place.emoji}
			})
			return board
		}
		CreateBoard(places,size,backgroundEmoji)
		CreateBlocks(places,backgroundEmoji)
		let board = CreateGame(places,size)
		const reply = await message.reply({
			embeds:[
				new createEmbed()
				.setDescription(`${board}`)
			],
			components:[
				new createActionRow()
				.setComponents([
					new createButton().setCustomId("left").setEmoji("⬅").setStyle("1"),
					new createButton().setCustomId("right").setEmoji("➡").setStyle("1"),
					new createButton().setCustomId("rotate").setEmoji("🔄").setStyle("1")
				])
			],
			fetchReply:true
		})
		function Updater(){
			const tm = setTimeout(Updater,1500)
			let description = ''
			let stoped = false
			let newBlock = false
			function Checker(places,oldPositions,newPositions){
				if(newPositions.length <= 3 || newPositions.includes(undefined) || newPositions.filter(p => p == undefined).length >=1){
					for(let x=0;x<18;x++){
						console.log(places.filter(place => place.name.slice(0,1) == abc[x]).filter(place => place.landed))
						if(places.filter(place => place.name.slice(0,1) == "a").filter(place => place.landed)){
							stoped = true
						}
					}
				}
				oldPositions.forEach(oldPosition => {
					oldPosition.floating = false
					oldPosition.emoji = "⬛"
				})
				newPositions.forEach(newPosition=>{
					newPosition.floating = true;
				})
				if(places.filter(place => place.floating == true).length >= 1){
					let ok = true;
						for(let i = 0;i<newPositions.length;i++){
							if(places.filter(p => p.name.slice(0,1) == abc[abc.indexOf(newPositions[i].name.slice(0,1))+1] && p.landed && p.name.slice(1) == newPositions[i].name.slice(1)).length >= 1){
								newPositions.forEach(newPosition=>{
									newPosition.floating = false
									newPosition.landed = true;
									if(currentBlockType == "i")newPosition.emoji = "🟫"
									if(currentBlockType == "o")newPosition.emoji = "🟨"
									if(currentBlockType == "s")newPosition.emoji = "🟩"
									if(currentBlockType == "z")newPosition.emoji = "🟥"
									if(currentBlockType == "j")newPosition.emoji = "🟦"
									if(currentBlockType == "l")newPosition.emoji = "🟧"
									if(currentBlockType == "t")newPosition.emoji = "🟪"
								})
								newBlock = true;
								ok = true
							}
						}
					if(newPositions.filter(p => p.name.slice(0,1) == "r").length >=1){
						newPositions.forEach(newPosition=>{
							newPosition.floating = false
							newPosition.landed = true;
							if(currentBlockType == "i")newPosition.emoji = "🟫"
							if(currentBlockType == "o")newPosition.emoji = "🟨"
							if(currentBlockType == "s")newPosition.emoji = "🟩"
							if(currentBlockType == "z")newPosition.emoji = "🟥"
							if(currentBlockType == "j")newPosition.emoji = "🟦"
							if(currentBlockType == "l")newPosition.emoji = "🟧"
							if(currentBlockType == "t")newPosition.emoji = "🟪"
						})
						oldPositions.forEach(oldPosition=>{
							oldPosition.floating = false
						})
						newBlock = true;
						ok = true
					}
					if(ok){
						newPositions.forEach(newPosition=>{
							if(currentBlockType == "i")newPosition.emoji = "🟫"
							if(currentBlockType == "o")newPosition.emoji = "🟨"
							if(currentBlockType == "s")newPosition.emoji = "🟩"
							if(currentBlockType == "z")newPosition.emoji = "🟥"
							if(currentBlockType == "j")newPosition.emoji = "🟦"
							if(currentBlockType == "l")newPosition.emoji = "🟧"
							if(currentBlockType == "t")newPosition.emoji = "🟪"
						})
					}
						
				}else{
					newBlock = true;
				}
				places.filter(place => !place.floating && !place.landed).forEach(place => {place.emoji = "⬛"})
				if(newBlock){
					if(oldPositions.filter(place => place.name.slice(0,1) == "a").length >= 1)return stoped = true
					rotated = 0
					CreateBlocks(places,"⬛")
				}
				for(let y=0;y<18;y++){
					if(places.filter(place => place.name.slice(0,1) == abc[y] && place.landed).length >= 10){
						for(let i=0;i<places.filter(place => place.name.slice(0,1) == abc[y]).length;i++){
							places.filter(place => place.name.slice(0,1) == abc[y])[i].landed = false
							places.filter(place => place.name.slice(0,1) == abc[y])[i].floating = false
						}
						for(let i=places.filter(place => place.landed).length-1;i>-1;i--){
							position=places.filter(place => place.landed)[i]
							const pl = places.filter(place => place.name === `${abc[abc.indexOf(position.name.slice(0,1))+1]}${position.name.slice(1)}`)[0]
							if(pl){
								pl.emoji = position.emoji
								pl.landed = true
							}
							position.landed = false
							position.emoji = backgroundEmoji
						}
						console
					}
				}
				places.forEach(place => {
					if(Number(place.name.slice(1)) === 10){description += `${place.emoji}\n`}else{description += place.emoji}
				})
				if(stoped){
					reply.edit({
						embeds:[
							new createEmbed()
							.setDescription(`${description}`)
						],
						components:[]
					})
					collector.stop()
					clearTimeout(tm)
					return
				}
				reply.edit({
					embeds:[
						new createEmbed()
						.setDescription(`${description}`)
					]
				})
			}
			function DecideMovement(places,oldPosition,moveablePlaces){
				const newPosition = moveablePlaces
				Checker(places,oldPosition,newPosition)
			}
			function GetMoveablePlaces(places,position){
				let moveablePlaces = []
				position.forEach(position => {
					if(position.name.slice(0,1) != places[places.length - 1].name.slice(0,1)){
						for(let i = 0;i<17;i++){
							if(position.name.slice(0,1) === abc[i]){
								moveablePlaces.push(places.filter(place => place.name === `${abc[i+1]}${position.name.slice(1)}`)[0])[0]
							}
						}
					}
				})
				DecideMovement(places,position,moveablePlaces)
			}
			function getPosition(places){
				const position = places.filter(place => place.floating === true)
				GetMoveablePlaces(places,position)
			}
			getPosition(places)
		}
		Updater()
		const filter = int => int.user.id == message.author.id
		const collector = reply.createMessageComponentCollector({filter})
		collector.on("collect",async d => {
			let description = ''
			let stoped = false
			let newBlock = false
			function Checker(places,oldPositions,newPositions,iName){
				if(newPositions.length <= 3 || newPositions.includes(undefined) || newPositions.filter(p => p == undefined).length >=1){
					for(let x=0;x<18;x++){
						console.log(places.filter(place => place.name.slice(0,1) == abc[x]).filter(place => place.landed))
						if(places.filter(place => place.name.slice(0,1) == "a").filter(place => place.landed)){
							stoped = true
						}
					}
				}
				for(let y=0;y<18;y++){
					if(places.filter(place => place.name.slice(0,1) == abc[y] && place.landed).length >= 10){
						for(let i=0;i<places.filter(place => place.name.slice(0,1) == abc[y]).length;i++){
							places.filter(place => place.name.slice(0,1) == abc[y])[i].landed = false
							places.filter(place => place.name.slice(0,1) == abc[y])[i].floating = false
						}
						let positions = places.filter(place => place.landed)
						positions.forEach(position => {
							for(let i = 0;i<17-y;i++){
								places.filter(place => place.name === `${abc[i+1]}${position.name.slice(1)}`)[i]
								if(position.name.slice(0,1) === abc[i]){
									places.filter(place => place.name === `${abc[i+1]}${position.name.slice(1)}`)[i].emoji = position.emoji
									places.filter(place => place.name === `${abc[i+1]}${position.name.slice(1)}`)[i].landed = true
								}
							}
						})
					}
				}
				oldPositions.forEach(oldPosition => {
					oldPosition.floating = false
					oldPosition.emoji = "⬛"
				})
				newPositions.forEach(newPosition=>{
					newPosition.floating = true;
				})
				if(places.filter(place => place.floating == true).length >= 1){
					let ok = true;
						for(let i = 0;i<newPositions.length;i++){
							if(places.filter(p => p.name.slice(0,1) == abc[abc.indexOf(newPositions[i].name.slice(0,1))+1] && p.landed).length >= 1){
								newPositions.forEach(newPosition=>{
									newPosition.floating = false
									newPosition.landed = true;
									if(currentBlockType == "i")newPosition.emoji = "🟫"
									if(currentBlockType == "o")newPosition.emoji = "🟨"
									if(currentBlockType == "s")newPosition.emoji = "🟩"
									if(currentBlockType == "z")newPosition.emoji = "🟥"
									if(currentBlockType == "j")newPosition.emoji = "🟦"
									if(currentBlockType == "l")newPosition.emoji = "🟧"
									if(currentBlockType == "t")newPosition.emoji = "🟪"
								})
								newBlock = true;
								ok = true
							}
						}

					if(newPositions.filter(p => p.landed == true).length >=1){
						if(iName == "right" || iName == "left")return
						oldPositions.forEach(oldPosition=>{
							oldPosition.floating = false
							oldPosition.landed = true;
							if(currentBlockType == "i")oldPosition.emoji = "🟫"
							if(currentBlockType == "o")oldPosition.emoji = "🟨"
							if(currentBlockType == "s")oldPosition.emoji = "🟩"
							if(currentBlockType == "z")oldPosition.emoji = "🟥"
							if(currentBlockType == "j")oldPosition.emoji = "🟦"
							if(currentBlockType == "l")oldPosition.emoji = "🟧"
							if(currentBlockType == "t")oldPosition.emoji = "🟪"
						})
						newPositions.forEach(newPosition=>{
							newPosition.floating = false;
						})
						newBlock = true;
						ok = false
					}
					if(newPositions.filter(p => p.name.slice(0,1) == "r").length >=1){
						newPositions.forEach(newPosition=>{
							newPosition.floating = false
							newPosition.landed = true;
							if(currentBlockType == "i")newPosition.emoji = "🟫"
							if(currentBlockType == "o")newPosition.emoji = "🟨"
							if(currentBlockType == "s")newPosition.emoji = "🟩"
							if(currentBlockType == "z")newPosition.emoji = "🟥"
							if(currentBlockType == "j")newPosition.emoji = "🟦"
							if(currentBlockType == "l")newPosition.emoji = "🟧"
							if(currentBlockType == "t")newPosition.emoji = "🟪"
						})
						oldPositions.forEach(oldPosition=>{
							oldPosition.floating = false
						})
						newBlock = true;
						ok = true
					}
					if(ok){
						newPositions.forEach(newPosition=>{
							if(currentBlockType == "i")newPosition.emoji = "🟫"
							if(currentBlockType == "o")newPosition.emoji = "🟨"
							if(currentBlockType == "s")newPosition.emoji = "🟩"
							if(currentBlockType == "z")newPosition.emoji = "🟥"
							if(currentBlockType == "j")newPosition.emoji = "🟦"
							if(currentBlockType == "l")newPosition.emoji = "🟧"
							if(currentBlockType == "t")newPosition.emoji = "🟪"
						})
					}
						
				}else{
					newBlock = true;
				}
				places.filter(place => !place.floating && !place.landed).forEach(place => {place.emoji = "⬛"})
				if(newBlock){
					if(oldPositions.filter(place => place.name.slice(0,1) == "a").length >= 1)return stoped = true
					rotated = 0
					CreateBlocks(places,"⬛")
				}
				places.forEach(place => {
					if(Number(place.name.slice(1)) === 10){description += `${place.emoji}\n`}else{description += place.emoji}
				})
				if(stoped){
					d.update({
						embeds:[
							new createEmbed()
							.setDescription(`${description}`)
						],
						components:[]
					})
					collector.stop()
					return
				}
				d.update({
					embeds:[
						new createEmbed()
						.setDescription(`${description}`)
					]
				})
			}
			function DecideMovement(places,oldPosition,moveablePlaces,iName){
				const newPosition = moveablePlaces
				Checker(places,oldPosition,newPosition,iName)
			}
			function GetMoveablePlaces(places,position,iName){
				let moveablePlaces = []
				position.forEach(position => {
					// Make Upcoming choices for movement
					if(Number(position.name.slice(1)) > 1 && places.filter(place => place.name === `${position.name.slice(0,1)}${Number(position.name.slice(1)) - 1}` && place.landed != true) && iName === "left"){
						moveablePlaces.push(places.filter(place => place.name === `${position.name.slice(0,1)}${Number(position.name.slice(1)) - 1}`)[0])[0]
					}
					if(Number(position.name.slice(1)) < size && places.filter(place => place.name === `${position.name.slice(0,1)}${Number(position.name.slice(1)) + 1}` && place.landed != true)&& iName === "right"){
						moveablePlaces.push(places.filter(place => place.name === `${position.name.slice(0,1)}${Number(position.name.slice(1)) + 1}`)[0])[0]
					}
				})
				if(iName === "rotate"){
					if(currentBlockType == "i"){
						if(rotated == 0){
							const middle = places.filter(place => place.floating)[1]
							for(let i=0;i<3;i++){
								moveablePlaces.push(places.filter(place => place.name.slice(0,1) === middle.name.slice(0,1) && Number(place.name.slice(1)) >= Number(middle.name.slice(1)))[i])
							}
							for(let i=0;i<1;i++){
								moveablePlaces.push(places.filter(place => place.name.slice(0,1) === middle.name.slice(0,1) && Number(place.name.slice(1)) == Number(middle.name.slice(1))-1)[0])
							}
							rotated=1
						}else if(rotated == 1){
							const middle = places.filter(place => place.floating)[1]
							for(let i = 0;i<17;i++){
								if(middle.name.slice(0,1) === abc[i] && abc[i] != "a"){
									moveablePlaces.push(places.filter(place => place.name === `${abc[i-1]}${middle.name.slice(1)}`)[0])[0]
									moveablePlaces.push(places.filter(place => place.name === `${abc[i]}${middle.name.slice(1)}`)[0])[0]
								}
								if(middle.name.slice(0,1) === abc[i] && abc[i] != "p"){
									moveablePlaces.push(places.filter(place => place.name === `${abc[i+1]}${middle.name.slice(1)}`)[0])[0]
									moveablePlaces.push(places.filter(place => place.name === `${abc[i+2]}${middle.name.slice(1)}`)[0])[0]
								}
							}
							rotated=0
						}
					}
					if(currentBlockType == "o"){
						return
					}
					if(currentBlockType == "s"){
						if(rotated == 0){
							let middle 
							let middles = []
							for(let i=0;i<places.filter(place => place.floating).length;i++){
								if(places.filter(place => place.floating && place.name.slice(1) == places.filter(place => place.floating)[i].name.slice(1)).length >= 2){
									middles.push(places.filter(place => place.floating)[i])
								}
							}
							if(abc.indexOf(middles[0].name.slice(0,1)) < abc.indexOf(middles[middles.length-1].name.slice(0,1))){
								middle = middles[middles.length-1]
							}else{middle = middles[0]}
							for(let i=0;i<2;i++){
								if(middle.name.slice(0,1) === abc[i] && abc[i] == "p")return
								moveablePlaces.push(places.filter(place => 
									place.name.slice(0,1) === abc[abc.indexOf(`${middle.name.slice(0,1)}`)-i]
								)[Number(places.filter(place => Number(place.name.slice(1)) === Number(middle.name.slice(1)))[0].name.slice(1))-2])
								moveablePlaces.push(places.filter(place => 
									place.name.slice(0,1) === abc[abc.indexOf(`${middle.name.slice(0,1)}`)+i]
								)[Number(places.filter(place => Number(place.name.slice(1)) === Number(middle.name.slice(1)))[0].name.slice(1))-1])
							}
							rotated=1
						}
						else if(rotated == 1){
							let middle 
							let middles = []
							for(let i=0;i<places.filter(place => place.floating).length;i++){
								if(places.filter(place => place.floating && places.filter(place => place.floating)[i].name.slice(0,1) == place.name.slice(0,1)).length >= 2){
									middles.push(places.filter(place => place.floating)[i])
								}
							}
							if(abc.indexOf(middles[0].name.slice(0,1)) < abc.indexOf(middles[middles.length-1].name.slice(0,1))){
								middle = middles[middles.length-1]
							}else{middle = middles[0]}
							for(let i=0;i<2;i++){
								if(middle.name.slice(0,1) === abc[i] && abc[i] == "p")return
								moveablePlaces.push(places.filter(place => place.name.slice(0,1) === abc[abc.indexOf(`${middle.name.slice(0,1)}`)-1]
								)[Number(places.filter(place => place.name.slice(1) === middle.name.slice(1))[0].name.slice(1))+i])

								moveablePlaces.push(places.filter(place => place.name.slice(0,1) === abc[abc.indexOf(`${middle.name.slice(0,1)}`)]
								)[Number(places.filter(place => place.name.slice(1) === middle.name.slice(1))[0].name.slice(1))-i])
							}
							rotated=0
						}
					}
					if(currentBlockType == "z"){
						if(rotated == 0){
							let middle 
							let middles = []
							for(let i=0;i<places.filter(place => place.floating).length;i++){
								if(places.filter(place => place.floating && place.name.slice(1) == places.filter(place => place.floating)[i].name.slice(1)).length >= 2){
									middles.push(places.filter(place => place.floating)[i])
								}
							}
							 
							if(abc.indexOf(middles[0].name.slice(0,1)) < abc.indexOf(middles[middles.length-1].name.slice(0,1))){
								middle = middles[middles.length-1]
							}else{middle = middles[0]}
							for(let i=0;i<2;i++){
								if(middle.name.slice(0,1) === abc[i] && abc[i] == "p")return
								moveablePlaces.push(places.filter(place => 
									place.name.slice(0,1) === abc[abc.indexOf(`${middle.name.slice(0,1)}`)-i]
								)[Number(places.filter(place => Number(place.name.slice(1)) === Number(middle.name.slice(1)))[0].name.slice(1))])
								moveablePlaces.push(places.filter(place => 
									place.name.slice(0,1) === abc[abc.indexOf(`${middle.name.slice(0,1)}`)+i]
								)[Number(places.filter(place => Number(place.name.slice(1)) === Number(middle.name.slice(1)))[0].name.slice(1))-1])
							}
							rotated=1
						}
						else if(rotated == 1){
							let middle 
							let middles = []
							for(let i=0;i<places.filter(place => place.floating).length;i++){
								if(places.filter(place => place.floating && places.filter(place => place.floating)[i].name.slice(0,1) == place.name.slice(0,1)).length >= 2){
									middles.push(places.filter(place => place.floating)[i])
								}
							}
							if(abc.indexOf(middles[0].name.slice(0,1)) < abc.indexOf(middles[middles.length-1].name.slice(0,1))){
								middle = middles[0]
							}else{middle = middles[1]}
							for(let i=0;i<2;i++){
								if(middle.name.slice(0,1) === abc[i] && abc[i] == "p")return
								moveablePlaces.push(places.filter(place => place.name.slice(0,1) === abc[abc.indexOf(`${middle.name.slice(0,1)}`)+1]
								)[Number(places.filter(place => place.name.slice(1) === middle.name.slice(1))[0].name.slice(1))+i])

								moveablePlaces.push(places.filter(place => place.name.slice(0,1) === abc[abc.indexOf(`${middle.name.slice(0,1)}`)]
								)[Number(places.filter(place => place.name.slice(1) === middle.name.slice(1))[0].name.slice(1))-i])
							}
							rotated=0
						}
					}
					if(currentBlockType == "j"){
						if(rotated == 0){
							let middle 
							let middles = []
							for(let i=0;i<places.filter(place => place.floating).length;i++){
								if(places.filter(place => place.floating && place.name.slice(1) == places.filter(place => place.floating)[i].name.slice(1)).length >= 2){
									middles.push(places.filter(place => place.floating)[i])
								}
							}
							middle = middles[1]
							 
							for(let i=0;i<3;i++){
								if(middle.name.slice(0,1) === abc[i] && abc[i] == "p")return
								let y
								if(Number(middle.name.slice(1))-2 == 0)y = 0;else{y = Number(places.filter(place => Number(place.name.slice(1)) === Number(middle.name.slice(1))-2)[0].name.slice(1))}
								moveablePlaces.push(places.filter(place => 
									place.name.slice(0,1) === abc[abc.indexOf(`${middle.name.slice(0,1)}`)]
								)[y+i])
							}
							for(let i=0;i<1;i++){
								let y
								if(Number(middle.name.slice(1))-2 == 0)y = 0;else{y = Number(places.filter(place => Number(place.name.slice(1)) === Number(middle.name.slice(1))-2)[0].name.slice(1))}
								if(middle.name.slice(0,1) === abc[i] && abc[i] == "p")return
								moveablePlaces.push(places.filter(place => 
									place.name.slice(0,1) === abc[abc.indexOf(`${middle.name.slice(0,1)}`)-1]
								)[y+i])
							}
							rotated=1
						}
						else if(rotated == 1){
							let middle 
							let middles = []
							for(let i=0;i<places.filter(place => place.floating).length;i++){
								if(places.filter(place => place.floating && places.filter(place => place.floating)[i].name.slice(0,1) == place.name.slice(0,1)).length >= 2){
									middles.push(places.filter(place => place.floating)[i])
								}
							}
							 
							middle = middles[1]
							 
							for(let i=0;i<3;i++){
								if(middle.name.slice(0,1) === abc[i] && abc[i] == "p")return
								moveablePlaces.push(places.filter(place => 
									place.name.slice(0,1) === abc[abc.indexOf(middle.name.slice(0,1))-1]
								)[Number(places.filter(place => place.name.slice(1) === middle.name.slice(1))[0].name.slice(1))-1])
								moveablePlaces.push(places.filter(place => 
									place.name.slice(0,1) === abc[abc.indexOf(middle.name.slice(0,1))+i-1]
								)[Number(places.filter(place => place.name.slice(1) === middle.name.slice(1))[0].name.slice(1))-1])
							}
							for(let i=0;i<1;i++){
								moveablePlaces.push(places.filter(place => place.name.slice(0,1) === abc[abc.indexOf(middle.name.slice(0,1))-1]
								)[Number(places.filter(place => place.name.slice(1) === middle.name.slice(1))[0].name.slice(1))])
							}
							rotated=2
						}
						else if(rotated == 2){
							let middle 
							let middles = []
							for(let i=0;i<places.filter(place => place.floating).length;i++){
								if(places.filter(place => place.floating && place.name.slice(1) == places.filter(place => place.floating)[i].name.slice(1)).length >= 2){
									middles.push(places.filter(place => place.floating)[i])
								}
							}
							middle = middles[1]
							 
							for(let i=0;i<3;i++){
								if(middle.name.slice(0,1) === abc[i] && abc[i] == "p")return
								let y
								if(Number(middle.name.slice(1))-2 == 0)y = 0;else{y = Number(places.filter(place => Number(place.name.slice(1)) === Number(middle.name.slice(1))-2)[0].name.slice(1))}
								moveablePlaces.push(places.filter(place => 
									place.name.slice(0,1) === abc[abc.indexOf(`${middle.name.slice(0,1)}`)]
								)[y+i])
							}
							for(let i=0;i<1;i++){
								if(middle.name.slice(0,1) === abc[i] && abc[i] == "p")return
								moveablePlaces.push(places.filter(place => 
									place.name.slice(0,1) === abc[abc.indexOf(`${middle.name.slice(0,1)}`)+1]
								)[Number(places.filter(place => Number(place.name.slice(1)) === Number(middle.name.slice(1)))[0].name.slice(1))-i])
							}
							rotated=3
						}
						else if(rotated == 3){
							let middle 
							let middles = []
							for(let i=0;i<places.filter(place => place.floating).length;i++){
								if(places.filter(place => place.floating && places.filter(place => place.floating)[i].name.slice(0,1) == place.name.slice(0,1)).length >= 2){
									middles.push(places.filter(place => place.floating)[i])
								}
							}
							 
							middle = middles[1]
							 
							for(let i=0;i<3;i++){
								if(middle.name.slice(0,1) === abc[i] && abc[i] == "p")return
								moveablePlaces.push(places.filter(place => 
									place.name.slice(0,1) === abc[abc.indexOf(middle.name.slice(0,1))-1]
								)[Number(places.filter(place => place.name.slice(1) === middle.name.slice(1))[0].name.slice(1))-1])
								moveablePlaces.push(places.filter(place => 
									place.name.slice(0,1) === abc[abc.indexOf(middle.name.slice(0,1))+i-1]
								)[Number(places.filter(place => place.name.slice(1) === middle.name.slice(1))[0].name.slice(1))-1])
							}

							for(let i=0;i<1;i++){
								moveablePlaces.push(places.filter(place => place.name.slice(0,1) === abc[abc.indexOf(middle.name.slice(0,1))+1]
								)[Number(places.filter(place => place.name.slice(1) === middle.name.slice(1))[0].name.slice(1))-2])
							}
							rotated=0
						}
					}
					if(currentBlockType == "l"){
						if(rotated == 0){
							let middle 
							let middles = []
							for(let i=0;i<places.filter(place => place.floating).length;i++){
								if(places.filter(place => place.floating && place.name.slice(1) == places.filter(place => place.floating)[i].name.slice(1)).length >= 2){
									middles.push(places.filter(place => place.floating)[i])
								}
							}
							middle = middles[1]
							 
							for(let i=0;i<3;i++){
								if(middle.name.slice(0,1) === abc[i] && abc[i] == "p")return
								let y
								if(Number(middle.name.slice(1))-2 == 0)y = 0;else{y = Number(places.filter(place => Number(place.name.slice(1)) === Number(middle.name.slice(1))-2)[0].name.slice(1))}
								moveablePlaces.push(places.filter(place => 
									place.name.slice(0,1) === abc[abc.indexOf(`${middle.name.slice(0,1)}`)]
								)[y+i])
							}
							for(let i=0;i<1;i++){
								let y
								if(Number(middle.name.slice(1))-2 == 0)y = 0;else{y = Number(places.filter(place => Number(place.name.slice(1)) === Number(middle.name.slice(1))-2)[0].name.slice(1))}
								if(middle.name.slice(0,1) === abc[i] && abc[i] == "p")return
								moveablePlaces.push(places.filter(place => 
									place.name.slice(0,1) === abc[abc.indexOf(`${middle.name.slice(0,1)}`)+1]
								)[y+i])
							}
							rotated=1
						}
						else if(rotated == 1){
							let middle 
							let middles = []
							for(let i=0;i<places.filter(place => place.floating).length;i++){
								if(places.filter(place => place.floating && places.filter(place => place.floating)[i].name.slice(0,1) == place.name.slice(0,1)).length >= 2){
									middles.push(places.filter(place => place.floating)[i])
								}
							}
							 
							middle = middles[1]
							 
							for(let i=0;i<3;i++){
								if(middle.name.slice(0,1) === abc[i] && abc[i] == "p")return
								moveablePlaces.push(places.filter(place => 
									place.name.slice(0,1) === abc[abc.indexOf(middle.name.slice(0,1))-1]
								)[Number(places.filter(place => place.name.slice(1) === middle.name.slice(1))[0].name.slice(1))-1])
								moveablePlaces.push(places.filter(place => 
									place.name.slice(0,1) === abc[abc.indexOf(middle.name.slice(0,1))+i-1]
								)[Number(places.filter(place => place.name.slice(1) === middle.name.slice(1))[0].name.slice(1))-1])
							}
							for(let i=0;i<1;i++){
								moveablePlaces.push(places.filter(place => 
									place.name.slice(0,1) === abc[abc.indexOf(middle.name.slice(0,1))-1]
								)[Number(places.filter(place => place.name.slice(1) === middle.name.slice(1))[0].name.slice(1))-2])
							}
							rotated=2
						}
						else if(rotated == 2){
							let middle 
							let middles = []
							for(let i=0;i<places.filter(place => place.floating).length;i++){
								if(places.filter(place => place.floating && place.name.slice(1) == places.filter(place => place.floating)[i].name.slice(1)).length >= 2){
									middles.push(places.filter(place => place.floating)[i])
								}
							}
							middle = middles[1]
							 
							for(let i=0;i<3;i++){
								if(middle.name.slice(0,1) === abc[i] && abc[i] == "p")return
								let y
								if(Number(middle.name.slice(1))-2 == 0)y = 0;else{y = Number(places.filter(place => Number(place.name.slice(1)) === Number(middle.name.slice(1))-2)[0].name.slice(1))}
								moveablePlaces.push(places.filter(place => 
									place.name.slice(0,1) === abc[abc.indexOf(`${middle.name.slice(0,1)}`)]
								)[y+i])
							}
							for(let i=0;i<1;i++){
								if(middle.name.slice(0,1) === abc[i] && abc[i] == "p")return
								moveablePlaces.push(places.filter(place => 
									place.name.slice(0,1) === abc[abc.indexOf(`${middle.name.slice(0,1)}`)-1]
								)[Number(places.filter(place => Number(place.name.slice(1)) === Number(middle.name.slice(1)))[0].name.slice(1))+i])
							}
							rotated=3
						}
						else if(rotated == 3){
							let middle 
							let middles = []
							for(let i=0;i<places.filter(place => place.floating).length;i++){
								if(places.filter(place => place.floating && places.filter(place => place.floating)[i].name.slice(0,1) == place.name.slice(0,1)).length >= 2){
									middles.push(places.filter(place => place.floating)[i])
								}
							}
							 
							middle = middles[1]
							 
							for(let i=0;i<3;i++){
								if(middle.name.slice(0,1) === abc[i] && abc[i] == "p")return
								moveablePlaces.push(places.filter(place => 
									place.name.slice(0,1) === abc[abc.indexOf(middle.name.slice(0,1))-1]
								)[Number(places.filter(place => place.name.slice(1) === middle.name.slice(1))[0].name.slice(1))-1])
								moveablePlaces.push(places.filter(place => 
									place.name.slice(0,1) === abc[abc.indexOf(middle.name.slice(0,1))+i-1]
								)[Number(places.filter(place => place.name.slice(1) === middle.name.slice(1))[0].name.slice(1))-1])
							}
							for(let i=0;i<1;i++){
								moveablePlaces.push(places.filter(place => place.name.slice(0,1) === abc[abc.indexOf(middle.name.slice(0,1))+1]
								)[Number(places.filter(place => place.name.slice(1) === middle.name.slice(1))[0].name.slice(1))])
							}
							rotated=0
						}
					}
					if(currentBlockType == "t"){
						if(rotated == 0){
							let middle 
							let middles = []
							for(let i=0;i<places.filter(place => place.floating).length;i++){
								if(places.filter(place => place.floating && place.name.slice(1) == places.filter(place => place.floating)[i].name.slice(1)).length >= 2){
									middles.push(places.filter(place => place.floating)[i])
								}
							}
							middle = middles[1]
							 
							for(let i=0;i<3;i++){
								if(middle.name.slice(0,1) === abc[i] && abc[i] == "p")return
								moveablePlaces.push(places.filter(place => 
									place.name.slice(0,1) === abc[abc.indexOf(middle.name.slice(0,1))-1]
								)[Number(places.filter(place => place.name.slice(1) === middle.name.slice(1))[0].name.slice(1))-1])
								moveablePlaces.push(places.filter(place => 
									place.name.slice(0,1) === abc[abc.indexOf(middle.name.slice(0,1))+i-1]
								)[Number(places.filter(place => place.name.slice(1) === middle.name.slice(1))[0].name.slice(1))-1])
							}
							for(let i=0;i<1;i++){
								moveablePlaces.push(places.filter(place => 
									place.name.slice(0,1) === abc[abc.indexOf(middle.name.slice(0,1))]
								)[Number(places.filter(place => place.name.slice(1) === middle.name.slice(1))[0].name.slice(1))])
							}
							rotated=1
						}
						else if(rotated == 1){
							let middle 
							let middles = []
							for(let i=0;i<places.filter(place => place.floating).length;i++){
								if(places.filter(place => place.floating && places.filter(place => place.floating)[i].name.slice(0,1) == place.name.slice(0,1)).length >= 2){
									middles.push(places.filter(place => place.floating)[i])
								}
							}
							 
							middle = middles[0]
							 
							for(let i=0;i<3;i++){
								if(middle.name.slice(0,1) === abc[i] && abc[i] == "p")return
								let y
								if(Number(middle.name.slice(1))-2 == 0)y = 0;else{y = Number(places.filter(place => Number(place.name.slice(1)) === Number(middle.name.slice(1))-2)[0].name.slice(1))}
								moveablePlaces.push(places.filter(place => 
									place.name.slice(0,1) === abc[abc.indexOf(`${middle.name.slice(0,1)}`)]
								)[y+i])
							}
							for(let i=0;i<1;i++){
								if(middle.name.slice(0,1) === abc[i] && abc[i] == "p")return
								moveablePlaces.push(places.filter(place => 
									place.name.slice(0,1) === abc[abc.indexOf(`${middle.name.slice(0,1)}`)+1]
								)[Number(places.filter(place => Number(place.name.slice(1)) === Number(middle.name.slice(1)))[0].name.slice(1))-1])
							}
							rotated=2
						}
						else if(rotated == 2){
							let middle 
							let middles = []
							for(let i=0;i<places.filter(place => place.floating).length;i++){
								if(places.filter(place => place.floating && place.name.slice(1) == places.filter(place => place.floating)[i].name.slice(1)).length >= 2){
									middles.push(places.filter(place => place.floating)[i])
								}
							}
							middle = middles[0]
							for(let i=0;i<3;i++){
								if(middle.name.slice(0,1) === abc[i] && abc[i] == "p")return
								moveablePlaces.push(places.filter(place => 
									place.name.slice(0,1) === abc[abc.indexOf(middle.name.slice(0,1))-1]
								)[Number(places.filter(place => place.name.slice(1) === middle.name.slice(1))[0].name.slice(1))-1])
								moveablePlaces.push(places.filter(place => 
									place.name.slice(0,1) === abc[abc.indexOf(middle.name.slice(0,1))+i-1]
								)[Number(places.filter(place => place.name.slice(1) === middle.name.slice(1))[0].name.slice(1))-1])
							}
							for(let i=0;i<1;i++){
								moveablePlaces.push(places.filter(place => place.name.slice(0,1) === abc[abc.indexOf(middle.name.slice(0,1))]
								)[Number(places.filter(place => place.name.slice(1) === middle.name.slice(1))[0].name.slice(1))-2])
							}
							rotated=3
						}
						else if(rotated == 3){
							let middle 
							let middles = []
							for(let i=0;i<places.filter(place => place.floating).length;i++){
								if(places.filter(place => place.floating && places.filter(place => place.floating)[i].name.slice(0,1) == place.name.slice(0,1)).length >= 2){
									middles.push(places.filter(place => place.floating)[i])
								}
							}
							middle = middles[1]
							for(let i=0;i<3;i++){
								if(middle.name.slice(0,1) === abc[i] && abc[i] == "p")return
								let y
								if(Number(middle.name.slice(1))-2 == 0)y = 0;else{y = Number(places.filter(place => Number(place.name.slice(1)) === Number(middle.name.slice(1))-2)[0].name.slice(1))}
								moveablePlaces.push(places.filter(place => 
									place.name.slice(0,1) === abc[abc.indexOf(`${middle.name.slice(0,1)}`)]
								)[y+i])
							}
							for(let i=0;i<1;i++){
								let y
								if(Number(middle.name.slice(1))-2 == 0)y = 0;else{y = Number(places.filter(place => Number(place.name.slice(1)) === Number(middle.name.slice(1))-2)[0].name.slice(1))}
								if(middle.name.slice(0,1) === abc[i] && abc[i] == "p")return
								moveablePlaces.push(places.filter(place => 
									place.name.slice(0,1) === abc[abc.indexOf(`${middle.name.slice(0,1)}`)-1]
								)[y+1])
							}
							rotated=0
						}
					}
				}
				if(moveablePlaces.length <= 3 || moveablePlaces.includes(undefined) || moveablePlaces.filter(p => p == undefined).length >=1)return
				console.log(moveablePlaces)
				DecideMovement(places,position,moveablePlaces,iName)
			}
			function getPosition(places,iName){
				const position = places.filter(place => place.floating === true)
				GetMoveablePlaces(places,position,iName)
			}
			getPosition(places,d.customId)
		})
}
module.exports = {Tetris}