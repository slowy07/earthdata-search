import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import { CollectionDownloadDisplay } from '../CollectionDownloadDisplay'
import Button from '../../Button/Button'

Enzyme.configure({ adapter: new Adapter() })

function setup(propsOverride) {
  const props = {
    authToken: '',
    granuleDownload: {
      1: []
    },
    match: {
      params: {
        retrieval_id: 2,
        id: 1
      },
      path: '/downloads/2/collections/1/links'
    },
    onFetchRetrievalCollectionGranuleLinks: jest.fn(),
    retrievalCollection: {
      id: 1,
      retrieval_id: 2,
      access_method: {
        type: 'download'
      },
      granule_count: 2
    },
    ...propsOverride
  }

  const enzymeWrapper = shallow(<CollectionDownloadDisplay {...props} />)

  return {
    enzymeWrapper,
    props
  }
}

describe('CollectionDownloadDisplay component', () => {
  test('should render self', () => {
    const { enzymeWrapper } = setup({
      granuleDownload: {
        1: []
      }
    })

    expect(enzymeWrapper.exists()).toBeTruthy()
  })

  describe('When viewing a download order', () => {
    describe('When rendering download links', () => {
      test('should render self correctly when loading', () => {
        const { enzymeWrapper } = setup({
          granuleDownload: {
            1: [
              'http://google.com'
            ]
          }
        })

        expect(enzymeWrapper.exists()).toBeTruthy()
        expect(enzymeWrapper.find('h4').text()).toBe(
          'Retrieving links, please wait (parsed 1 of 2)'
        )
        expect(enzymeWrapper.find(Button).length).toEqual(0)
      })


      test('should render self with links when they are done loading', () => {
        const { enzymeWrapper } = setup({
          granuleDownload: {
            1: [
              'http://google.com',
              'http://google.jp'
            ]
          }
        })

        expect(enzymeWrapper.exists()).toBeTruthy()
        expect(enzymeWrapper.find('ul.granule-links-list__list li').length).toBe(2)
        expect(enzymeWrapper.find('h4').text()).toBe(
          'Collection granule links have been retrieved'
        )
        expect(enzymeWrapper.find('.granule-links-list__state').prop('children')[0]).toEqual(
          'Please click the button to download these links'
        )
      })
    })

    describe('When rendering download script', () => {
      test('should render self correctly when loading', () => {
        const { enzymeWrapper } = setup({
          match: {
            params: {
              retrieval_id: 2,
              id: 1
            },
            path: '/downloads/2/collections/1/script'
          },
          granuleDownload: {
            1: [
              'http://google.com'
            ]
          }
        })

        expect(enzymeWrapper.exists()).toBeTruthy()
        expect(enzymeWrapper.find('h4').at(0).text()).toBe(
          'How to use this script'
        )
        expect(enzymeWrapper.find('h4').at(1).text()).toBe(
          'Retrieving links, please wait (parsed 1 of 2)'
        )
        expect(enzymeWrapper.find(Button).length).toEqual(0)
      })

      test('should render self with links when they are done loading', () => {
        const { enzymeWrapper } = setup({
          match: {
            params: {
              retrieval_id: 2,
              id: 1
            },
            path: '/downloads/2/collections/1/script'
          },
          granuleDownload: {
            1: [
              'http://google.com',
              'http://google.jp'
            ]
          }
        })

        expect(enzymeWrapper.exists()).toBeTruthy()
        expect(enzymeWrapper.find('pre.granule-links-list__list').text()).toContain('http://google.com')
        expect(enzymeWrapper.find('pre.granule-links-list__list').text()).toContain('http://google.jp')
        expect(enzymeWrapper.find('h4').at(0).text()).toBe(
          'How to use this script'
        )
        expect(enzymeWrapper.find('h4').at(1).text()).toBe(
          'Collection granule links have been retrieved'
        )
        expect(enzymeWrapper.find('.granule-links-list__state').prop('children')[0]).toEqual(
          'Please click the button to download the script'
        )
      })
    })
  })

  describe('When viewing an OPeNDAP order', () => {
    describe('When rendering download links', () => {
      test('should render self correctly when loading', () => {
        const { enzymeWrapper } = setup({
          granuleDownload: {
            1: [
              'http://google.com'
            ]
          },
          retrievalCollection: {
            id: 1,
            retrieval_id: 2,
            access_method: {
              type: 'opendap'
            },
            granule_count: 2
          }
        })

        expect(enzymeWrapper.exists()).toBeTruthy()
        expect(enzymeWrapper.find('h4').text()).toBe(
          'Retrieving links, please wait (parsed 1 of 2)'
        )
        expect(enzymeWrapper.find(Button).length).toEqual(0)
      })

      test('should render self with links when they are done loading', () => {
        const { enzymeWrapper } = setup({
          granuleDownload: {
            1: [
              'http://google.com',
              'http://google.jp'
            ]
          },
          retrievalCollection: {
            id: 1,
            retrieval_id: 2,
            access_method: {
              type: 'opendap'
            },
            granule_count: 2
          }
        })

        expect(enzymeWrapper.exists()).toBeTruthy()
        expect(enzymeWrapper.find('ul.granule-links-list__list li').length).toBe(2)
        expect(enzymeWrapper.find('h4').text()).toBe(
          'Collection granule links have been retrieved'
        )
        expect(enzymeWrapper.find('.granule-links-list__state').prop('children')[0]).toEqual(
          'Please click the button to download these links'
        )
      })
    })

    describe('When rendering download script', () => {
      test('should render self correctly when loading', () => {
        const { enzymeWrapper } = setup({
          match: {
            params: {
              retrieval_id: 2,
              id: 1
            },
            path: '/downloads/2/collections/1/script'
          },
          granuleDownload: {
            1: [
              'http://google.com'
            ]
          },
          retrievalCollection: {
            id: 1,
            retrieval_id: 2,
            access_method: {
              type: 'opendap'
            },
            granule_count: 2
          }
        })

        expect(enzymeWrapper.exists()).toBeTruthy()
        expect(enzymeWrapper.find('h4').at(0).text()).toBe(
          'How to use this script'
        )
        expect(enzymeWrapper.find('h4').at(1).text()).toBe(
          'Retrieving links, please wait (parsed 1 of 2)'
        )
        expect(enzymeWrapper.find(Button).length).toEqual(0)
      })

      test('should render self with links when they are done loading', () => {
        const { enzymeWrapper } = setup({
          match: {
            params: {
              retrieval_id: 2,
              id: 1
            },
            path: '/downloads/2/collections/1/script'
          },
          granuleDownload: {
            1: [
              'http://google.com',
              'http://google.jp'
            ]
          },
          retrievalCollection: {
            id: 1,
            retrieval_id: 2,
            access_method: {
              type: 'opendap'
            },
            granule_count: 2
          }
        })

        expect(enzymeWrapper.exists()).toBeTruthy()
        expect(enzymeWrapper.find('pre.granule-links-list__list').text()).toContain('http://google.com')
        expect(enzymeWrapper.find('pre.granule-links-list__list').text()).toContain('http://google.jp')
        expect(enzymeWrapper.find('h4').at(0).text()).toBe(
          'How to use this script'
        )
        expect(enzymeWrapper.find('h4').at(1).text()).toBe(
          'Collection granule links have been retrieved'
        )
        expect(enzymeWrapper.find('.granule-links-list__state').prop('children')[0]).toEqual(
          'Please click the button to download the script'
        )
      })
    })
  })
})
