import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';
import { BimModule } from './modules/bim/bim.module';
import { StorageModule } from './modules/storage/storage.module';

@Module({
  imports: [
    StorageModule,
    BimModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      path: '/graphql',
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      resolvers: {
        JSON: GraphQLJSON,
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
