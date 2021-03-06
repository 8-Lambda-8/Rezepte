import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../models/recipe';
import { RecipeService } from '../service/recipe.service';
import { UserData } from '../models/userData';
import { AuthService } from '../service/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit {

  id: string;
  recipe: Recipe = { name: "", categories: [], categoryIdArray: [], ingredients: [], author: "", text: "",originalText: "", id: "new" };

  displayedColumns: string[] = ['name', 'amount', 'unit'];
  
  myUserData: UserData =  {uid:"",name:"",permissionClass:0,photoURL:"",email:""};
  
  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private db: AngularFirestore,
    private readonly auth: AuthService,
    
  ) { 
    this.auth.user$.subscribe(user =>{
      this.db.collection('users').doc<UserData>(user.uid).valueChanges().subscribe(data=>this.myUserData=data)
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getRecipe();
  }

  getRecipe(): void {

    this.recipeService.getRecipe(this.id)
      .subscribe(recipe =>{
        this.recipe = recipe
      });
  }

}
