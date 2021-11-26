import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { AxiosError } from 'axios';
import { MainClient, Pokemon, PokemonColor, PokemonSpecies } from 'pokenode-ts';

const api = new MainClient();

type Error = {
    status?: number;
    data?: any;
    statusText?: string;
}

export const pokemonApi = createApi({
    reducerPath: 'pokemonApi',
    baseQuery: fakeBaseQuery<Error>(),
    endpoints: (builder) => ({
        getPokemon: builder.query<Pokemon, GetPokemonArgs>({
            queryFn: async ({ name }) => {
                try {
                    const result = await api.pokemon.getPokemonByName(name);

                    return {
                        data: result,
                    }
                } catch (axiosError) {
                    const err = axiosError as AxiosError;

                    return {
                        error: { status: err.response?.status, data: err.response?.data || err.message, statusText: err.message },
                    };
                }
            }
        }),
        getPokemonColor: builder.query<PokemonColor, GetPokemonArgs>({
            queryFn: async ({ name }) => {
                try {
                    const result = await api.pokemon.getPokemonColorByName(name);

                    return {
                        data: result
                    }
                } catch (axiosError) {
                    const err = axiosError as AxiosError;

                    return {
                        error: { status: err.response?.status, data: err.response?.data || err.message, statusText: err.message },
                    };
                }
            }
        }),
        getPokemonSpecies: builder.query<PokemonSpecies, GetPokemonArgs>({
            queryFn: async ({ name }) => {
                try {
                    const result = await api.pokemon.getPokemonSpeciesByName(name);

                    return {
                        data: result
                    }
                } catch (axiosError) {
                    const err = axiosError as AxiosError;

                    return {
                        error: { status: err.response?.status, data: err.response?.data || err.message, statusText: err.message },
                    };
                }
            }
        })
    }),
});

type GetPokemonArgs = {
    name: string;
}

export const { useGetPokemonQuery, useLazyGetPokemonQuery, useGetPokemonColorQuery, useLazyGetPokemonColorQuery, useGetPokemonSpeciesQuery, useLazyGetPokemonSpeciesQuery } = pokemonApi;
