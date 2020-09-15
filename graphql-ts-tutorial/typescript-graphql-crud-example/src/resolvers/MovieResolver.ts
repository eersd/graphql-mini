import { Movie } from "../entity/Movie";
import { Arg, Field, InputType, Int, Mutation, Query, Resolver } from "type-graphql";

@InputType()
class MovieInput{
    @Field()
    title: string;

    @Field(()=>Int)
    minutes: number;
}

@InputType()
class MovieUpdateInput{
    @Field(()=>String ,{nullable: true})
    title?: string;

    @Field(()=>Int, {nullable: true})
    minutes?: number;
}

@Resolver()
export class MovieResolver{
    @Mutation(()=>Movie)
    async createMovie(
        @Arg("options", ()=>MovieInput) options: MovieInput)

        // @Arg("title") title: string, 
        // @Arg("minutes", ()=>Int) minutes: number)
        {
        // console.log(title+ minutes);
        const movie = await Movie.create(options).save();
        // await Movie.insert(options);
        return movie;
    }

    @Query(()=>[Movie])
    getMovies(){
        return Movie.find();
    }

    @Mutation(()=>Boolean)
    async updateMovie(
        @Arg('id', ()=>Int) id: number,
        @Arg('input', ()=> MovieUpdateInput) input:MovieUpdateInput )
        {
        await Movie.update({id}, input);
        return true;
    }

    @Mutation(()=> Boolean)
    async deleteMovie(
        @Arg('id', ()=> Int) id:number
    ){
        await Movie.delete({id});
        return true;
    }
}