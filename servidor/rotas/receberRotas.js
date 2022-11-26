const express = require("express");

const rotas = express.Router();

const Axios = require("axios").default;

const receberControles = require("../controle/receberControles");
const https = require("https");

//ROTAS DO SITE

rotas.get("/", receberControles.home);
rotas.get("/receita/:id", receberControles.showReceita);
rotas.get("/categories", receberControles.displaycategories);
rotas.get("/categories/:id", receberControles.showCategoriesId);
rotas.post("/pesquisar", receberControles.pesquisaReceitas);
rotas.get("/explorar-ultimo", receberControles.adicionadaRecentemente);
rotas.get("/receita-aleatoria", receberControles.receitasAleatorias);
rotas.get("/contato", receberControles.redcontato);
rotas.get("/sobre", receberControles.redsobre);

//Enviar receitas
rotas.get("/enviar-receita", receberControles.enviarReceitas);
rotas.post("/enviar-receita", receberControles.enviarReceitas2);

//DELETAR RECEITAS
rotas.get("/receita/:id/deletar", receberControles.deletar_receitas);

//Editar Receitas
rotas.get("/update", receberControles.editreceita);
rotas.post("/update", receberControles.updatereceita);

rotas.get("/recomendations/:id", receberControles.showRecommendations);

rotas.get("/calories", receberControles.rendercalorias);

//API CALORIAS

/* 
rotas.get("/calories", function(req,res){
    
    let API_ID = "27042fc5";
    let API_KEY = "953876d43589755585698304c88ea169";
    let Search = req.body.pesquisarTermo;
    https.get(`https://api.edamam.com/api/recipes/v2?app_id=${API_ID}&app_key=${API_KEY}&q=pizza&from=0&to=10&type=public`, function (response){
      let dados='';
      response.on("data", function(dadosAPI){
        dados += dadosAPI;
        console.log(dados)

      })

      response.on('end', function(){

          res.render('calories' ,{ Dados : JSON.parse(dados)})
    
      })
    })
    }) */

rotas.post("/calories", async (req, res) =>{
  //pesquisarTermo
  try {
    let API_ID = "a802fccc";
    let API_KEY = "acebcca536609e977ff9920d6b667b0d";
    let Search = req.body.pesquisarTermo;

    let response = await fetch(
      `https://api.edamam.com/api/recipes/v2?q=pizza&app_id=a802fccc&app_key=acebcca536609e977ff9920d6b667b0d&from=0&to=2&type=public`
    )
      data = await response.json();


      for(var i=0; i<5; i++){
        console.log(data.hits[i].recipe.label)
      }
    
      res.render("calories", { Data: data });


  
  } catch (error) {
    res.status(500).send({ message: error.message || "Ocorreu um erro" });
  }


});

module.exports = rotas;
//ultimasReceita
