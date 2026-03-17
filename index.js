const express=require("express")
let app=express()
let path=require("path")
app.set("view engine","ejs")
app.use(express.urlencoded({extended:true}))
app.use(express.json())
const{v4:uuidv4}=require('uuid')
app.use(express.static(path.join(__dirname,"public")))
let port=3000;
let methodOverride=require('method-override')
app.use(methodOverride('_method'))
let posts=[
    {
        id:uuidv4(),
        username:"apnacollege",
        content:"i love coding"
    },
    {
        id:uuidv4(),
        username:"maneesha",
        content:"hardwork beats success"
    },
    {
        id:uuidv4(),
        username:"indu",
        content:"success is the best revenage"
    }
]
app.listen(port,()=>{
    console.log("app is listening");
})
app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts})
})
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs")
})
app.post("/posts",(req,res)=>{
    let {username,content}=req.body;
    let id=uuidv4();
    posts.push({username,content,id})
    res.redirect("/posts")
})
app.get("/posts/:id",(req,res)=>{
    let{id}=req.params;
    let post=posts.find((p)=>
        id===p.id
    )
    res.render("view.ejs",{post})
}
)
app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
     let newcontent=req.body.content;
    let post=posts.find(p=>id===p.id);
   
    post.content=newcontent;
    res.redirect("/posts")

})
app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post=posts.find(p=>id===p.id)
    res.render("edit.ejs",{post})
})
app.delete("/posts/:id",(req,res)=>{
        let {id}=req.params;
    posts=posts.filter(p=>id!==p.id);
    res.redirect("/posts")
})