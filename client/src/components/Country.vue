<script lang="ts">
import { useQuery, useResult } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { watchEffect } from 'vue'

type Country = {
  name: string
}

type CountryQuery = {
  getCountry: Country
}

const GET_COUNTRY = gql`
  query GetCountry {
    getCountry {
      name
    }
  }
`

export default {
  setup () {
    const code = 'US'
    const { result, loading, error } = useQuery<CountryQuery>(GET_COUNTRY, { code })
    const countryName = useResult(result, null, data => {
      console.log('useResult', data)
      return data.getCountry.name
    })

    watchEffect(() => console.log('country', {
      result: result.value,
      countryName,
    }))

    return {
      countryName,
      loading,
      error,
    }
  },
}
</script>

<template>
  <div v-if="loading">Loading...</div>

  <div v-else-if="error">Error: {{ error.message }}</div>

  <div v-else>
    Country: {{ countryName }}
  </div>
</template>