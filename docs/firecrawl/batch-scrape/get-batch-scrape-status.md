# Get Batch Scrape Status

## OpenAPI

````yaml v1-openapi GET /batch/scrape/{id}
paths:
  path: /batch/scrape/{id}
  method: get
  servers:
    - url: https://api.firecrawl.dev/v1
  request:
    security:
      - title: bearerAuth
        parameters:
          query: {}
          header:
            Authorization:
              type: http
              scheme: bearer
          cookie: {}
    parameters:
      path:
        id:
          schema:
            - type: string
              required: true
              description: The ID of the batch scrape job
              format: uuid
      query: {}
      header: {}
      cookie: {}
    body: {}
  response:
    '200':
      application/json:
        schemaArray:
          - type: object
            properties:
              status:
                allOf:
                  - type: string
                    description: >-
                      The current status of the batch scrape. Can be `scraping`,
                      `completed`, or `failed`.
              total:
                allOf:
                  - type: integer
                    description: >-
                      The total number of pages that were attempted to be
                      scraped.
              completed:
                allOf:
                  - type: integer
                    description: The number of pages that have been successfully scraped.
              creditsUsed:
                allOf:
                  - type: integer
                    description: The number of credits used for the batch scrape.
              expiresAt:
                allOf:
                  - type: string
                    format: date-time
                    description: The date and time when the batch scrape will expire.
              next:
                allOf:
                  - type: string
                    nullable: true
                    description: >-
                      The URL to retrieve the next 10MB of data. Returned if the
                      batch scrape is not completed or if the response is larger
                      than 10MB.
              data:
                allOf:
                  - type: array
                    description: The data of the batch scrape.
                    items:
                      type: object
                      properties:
                        markdown:
                          type: string
                        html:
                          type: string
                          nullable: true
                          description: >-
                            HTML version of the content on page if
                            `includeHtml`  is true
                        rawHtml:
                          type: string
                          nullable: true
                          description: >-
                            Raw HTML content of the page if `includeRawHtml`  is
                            true
                        links:
                          type: array
                          items:
                            type: string
                          description: List of links on the page if `includeLinks` is true
                        screenshot:
                          type: string
                          nullable: true
                          description: >-
                            Screenshot of the page if `includeScreenshot` is
                            true
                        metadata:
                          type: object
                          properties:
                            title:
                              type: string
                            description:
                              type: string
                            language:
                              type: string
                              nullable: true
                            sourceURL:
                              type: string
                              format: uri
                            '<any other metadata> ':
                              type: string
                            statusCode:
                              type: integer
                              description: The status code of the page
                            error:
                              type: string
                              nullable: true
                              description: The error message of the page
            refIdentifier: '#/components/schemas/BatchScrapeStatusResponseObj'
        examples:
          example:
            value:
              status: <string>
              total: 123
              completed: 123
              creditsUsed: 123
              expiresAt: '2023-11-07T05:31:56Z'
              next: <string>
              data:
                - markdown: <string>
                  html: <string>
                  rawHtml: <string>
                  links:
                    - <string>
                  screenshot: <string>
                  metadata:
                    title: <string>
                    description: <string>
                    language: <string>
                    sourceURL: <string>
                    '<any other metadata> ': <string>
                    statusCode: 123
                    error: <string>
        description: Successful response
    '402':
      application/json:
        schemaArray:
          - type: object
            properties:
              error:
                allOf:
                  - type: string
                    example: Payment required to access this resource.
        examples:
          example:
            value:
              error: Payment required to access this resource.
        description: Payment required
    '429':
      application/json:
        schemaArray:
          - type: object
            properties:
              error:
                allOf:
                  - type: string
                    example: >-
                      Request rate limit exceeded. Please wait and try again
                      later.
        examples:
          example:
            value:
              error: Request rate limit exceeded. Please wait and try again later.
        description: Too many requests
    '500':
      application/json:
        schemaArray:
          - type: object
            properties:
              error:
                allOf:
                  - type: string
                    example: An unexpected error occurred on the server.
        examples:
          example:
            value:
              error: An unexpected error occurred on the server.
        description: Server error
  deprecated: false
  type: path
components:
  schemas: {}

````