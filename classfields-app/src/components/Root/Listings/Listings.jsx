import React from 'react'
import styled from 'styled-components'

import { useQuery } from "@apollo/react-hooks";
import gql from 'graphql-tag'
import { AddListings } from './AddListings';

const StyledDescription = styled.p`
  margin-bottom: 0;
`

const StyledListing = styled.div`
  padding: 1rem 0;

  :not(:last-child) {
    border-bottom: 1px solid ${props => props.theme.veryLightGrey}
  }
`

const StyledTitle = styled.strong`
  display: block;
  font-size: 1.5rem;
  font-weight: 700;
`

const query = gql`
  {
    listings {
      id
      title
      description
    }
  }
`

export const Listings = () => {
  const { data, loading, refetch } = useQuery(query)

  if (loading) return 'Loading...'
  return(
    <div>
      <div>
        {data.listings.map(listing => (
          <StyledListing key={listing.id}>
            <StyledTitle>{listing.title}</StyledTitle>
            <StyledDescription>{listing.description}</StyledDescription>
          </StyledListing>
        ))}
      </div>
      <AddListings onAddListing={() => refetch()} />
    </div>
  )
}
