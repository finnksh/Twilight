const {hyperlink, SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');
const axios = require('axios').default;


module.exports = {
    data : new SlashCommandBuilder().setName('dank').setDescription('give me those dankiest meme'),
    async execute(interaction){
        axios
        .get("https://meme-api.com/gimme")
        .then((res) => {
            const result = res.data;
            const image_link  = result.url;
            const embed = new EmbedBuilder()
                            .setColor("#114ee8")
                            .setTitle(result.title)
                            .setDescription(result.postLink)
                            .setImage(image_link)
            interaction.reply({embeds : [embed]});
        })
    }
}