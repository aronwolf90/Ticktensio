Feature: API: list board lists

@javascript
Scenario: Get
  Given a test-organization exists and is loaded
  And I set headers:
   | Authorization | Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjF9.ClWbiKD35AyiLHuBiDeCTeDwseNvX4WxFlZqdar37TU |
   | Content-Type | application/vnd.api+json |
  And I send a GET request to "/api/v1/board_lists"
  Then the JSON response should be:
    """
    {
      "data": [
        {
          "id": "4",
          "type": "board-lists",
          "attributes": {
            "name": "Backlog",
            "kind": "open",
            "complexity": "12.0"
          },
          "relationships": {
            "issues": {
              "data": [
                {
                  "id": "4",
                  "type": "issues"
                },
                {
                  "id": "3",
                  "type": "issues"
                },
                {
                  "id": "2",
                  "type": "issues"
                },
                {
                  "id": "1",
                  "type": "issues"
                }
              ],
              "links": {
                "self": "/api/v1/board_lists/4/issues"
              }
            },
            "project": {
              "data": {
                "id": "1",
                "type": "projects"
              }
            }
          },
          "links": {
            "self": "/api/v1/board_lists/4"
          },
          "meta": {
            "permissions": {
              "update": true,
              "destroy": false
            }
          }
        },
        {
          "id": "5",
          "type": "board-lists",
          "attributes": {
            "name": "In development",
            "kind": "other",
            "complexity": "18.0"
          },
          "relationships": {
            "issues": {
              "data": [
                {
                  "id": "7",
                  "type": "issues"
                },
                {
                  "id": "6",
                  "type": "issues"
                },
                {
                  "id": "5",
                  "type": "issues"
                }
              ],
              "links": {
                "self": "/api/v1/board_lists/5/issues"
              }
            },
            "project": {
              "data": {
                "id": "1",
                "type": "projects"
              }
            }
          },
          "links": {
            "self": "/api/v1/board_lists/5"
          },
          "meta": {
            "permissions": {
              "update": true,
              "destroy": false
            }
          }
        },
        {
          "id": "6",
          "type": "board-lists",
          "attributes": {
            "name": "Closed",
            "kind": "closed",
            "complexity": "17.0"
          },
          "relationships": {
            "issues": {
              "data": [
                {
                  "id": "11",
                  "type": "issues"
                },
                {
                  "id": "10",
                  "type": "issues"
                },
                {
                  "id": "9",
                  "type": "issues"
                },
                {
                  "id": "8",
                  "type": "issues"
                }
              ],
              "links": {
                "self": "/api/v1/board_lists/6/issues"
              }
            },
            "project": {
              "data": {
                "id": "1",
                "type": "projects"
              }
            }
          },
          "links": {
            "self": "/api/v1/board_lists/6"
          },
          "meta": {
            "permissions": {
              "update": true,
              "destroy": false
            }
          }
        },
        {
          "id": "7",
          "type": "board-lists",
          "attributes": {
            "name": "Test project 2 open",
            "kind": "open",
            "complexity": "5.0"
          },
          "relationships": {
            "issues": {
              "data": [
                {
                  "id": "12",
                  "type": "issues"
                }
              ],
              "links": {
                "self": "/api/v1/board_lists/7/issues"
              }
            },
            "project": {
              "data": {
                "id": "2",
                "type": "projects"
              }
            }
          },
          "links": {
            "self": "/api/v1/board_lists/7"
          },
          "meta": {
            "permissions": {
              "update": true,
              "destroy": false
            }
          }
        },
        {
          "id": "8",
          "type": "board-lists",
          "attributes": {
            "name": "In development",
            "kind": "other",
            "complexity": "0.0"
          },
          "relationships": {
            "issues": {
              "data": [

              ],
              "links": {
                "self": "/api/v1/board_lists/8/issues"
              }
            },
            "project": {
              "data": {
                "id": "2",
                "type": "projects"
              }
            }
          },
          "links": {
            "self": "/api/v1/board_lists/8"
          },
          "meta": {
            "permissions": {
              "update": true,
              "destroy": true
            }
          }
        },
        {
          "id": "9",
          "type": "board-lists",
          "attributes": {
            "name": "Closed",
            "kind": "closed",
            "complexity": "0.0"
          },
          "relationships": {
            "issues": {
              "data": [

              ],
              "links": {
                "self": "/api/v1/board_lists/9/issues"
              }
            },
            "project": {
              "data": {
                "id": "2",
                "type": "projects"
              }
            }
          },
          "links": {
            "self": "/api/v1/board_lists/9"
          },
          "meta": {
            "permissions": {
              "update": true,
              "destroy": false
            }
          }
        },
        {
          "id": "10",
          "type": "board-lists",
          "attributes": {
            "name": "Test project 3 open",
            "kind": "open",
            "complexity": "0.0"
          },
          "relationships": {
            "issues": {
              "data": [

              ],
              "links": {
                "self": "/api/v1/board_lists/10/issues"
              }
            },
            "project": {
              "data": {
                "id": "3",
                "type": "projects"
              }
            }
          },
          "links": {
            "self": "/api/v1/board_lists/10"
          },
          "meta": {
            "permissions": {
              "update": true,
              "destroy": false
            }
          }
        },
        {
          "id": "11",
          "type": "board-lists",
          "attributes": {
            "name": "In development",
            "kind": "other",
            "complexity": "0.0"
          },
          "relationships": {
            "issues": {
              "data": [

              ],
              "links": {
                "self": "/api/v1/board_lists/11/issues"
              }
            },
            "project": {
              "data": {
                "id": "3",
                "type": "projects"
              }
            }
          },
          "links": {
            "self": "/api/v1/board_lists/11"
          },
          "meta": {
            "permissions": {
              "update": true,
              "destroy": true
            }
          }
        },
        {
          "id": "12",
          "type": "board-lists",
          "attributes": {
            "name": "Closed",
            "kind": "closed",
            "complexity": "0.0"
          },
          "relationships": {
            "issues": {
              "data": [

              ],
              "links": {
                "self": "/api/v1/board_lists/12/issues"
              }
            },
            "project": {
              "data": {
                "id": "3",
                "type": "projects"
              }
            }
          },
          "links": {
            "self": "/api/v1/board_lists/12"
          },
          "meta": {
            "permissions": {
              "update": true,
              "destroy": false
            }
          }
        },
        {
          "id": "13",
          "type": "board-lists",
          "attributes": {
            "name": "Test project 4 open",
            "kind": "open",
            "complexity": "0.0"
          },
          "relationships": {
            "issues": {
              "data": [

              ],
              "links": {
                "self": "/api/v1/board_lists/13/issues"
              }
            },
            "project": {
              "data": {
                "id": "4",
                "type": "projects"
              }
            }
          },
          "links": {
            "self": "/api/v1/board_lists/13"
          },
          "meta": {
            "permissions": {
              "update": true,
              "destroy": false
            }
          }
        },
        {
          "id": "14",
          "type": "board-lists",
          "attributes": {
            "name": "In development",
            "kind": "other",
            "complexity": "0.0"
          },
          "relationships": {
            "issues": {
              "data": [

              ],
              "links": {
                "self": "/api/v1/board_lists/14/issues"
              }
            },
            "project": {
              "data": {
                "id": "4",
                "type": "projects"
              }
            }
          },
          "links": {
            "self": "/api/v1/board_lists/14"
          },
          "meta": {
            "permissions": {
              "update": true,
              "destroy": true
            }
          }
        },
        {
          "id": "15",
          "type": "board-lists",
          "attributes": {
            "name": "Closed",
            "kind": "closed",
            "complexity": "0.0"
          },
          "relationships": {
            "issues": {
              "data": [

              ],
              "links": {
                "self": "/api/v1/board_lists/15/issues"
              }
            },
            "project": {
              "data": {
                "id": "4",
                "type": "projects"
              }
            }
          },
          "links": {
            "self": "/api/v1/board_lists/15"
          },
          "meta": {
            "permissions": {
              "update": true,
              "destroy": false
            }
          }
        },
        {
          "id": "16",
          "type": "board-lists",
          "attributes": {
            "name": "Test project 5 open",
            "kind": "open",
            "complexity": "0.0"
          },
          "relationships": {
            "issues": {
              "data": [

              ],
              "links": {
                "self": "/api/v1/board_lists/16/issues"
              }
            },
            "project": {
              "data": {
                "id": "5",
                "type": "projects"
              }
            }
          },
          "links": {
            "self": "/api/v1/board_lists/16"
          },
          "meta": {
            "permissions": {
              "update": true,
              "destroy": false
            }
          }
        },
        {
          "id": "17",
          "type": "board-lists",
          "attributes": {
            "name": "In development",
            "kind": "other",
            "complexity": "0.0"
          },
          "relationships": {
            "issues": {
              "data": [

              ],
              "links": {
                "self": "/api/v1/board_lists/17/issues"
              }
            },
            "project": {
              "data": {
                "id": "5",
                "type": "projects"
              }
            }
          },
          "links": {
            "self": "/api/v1/board_lists/17"
          },
          "meta": {
            "permissions": {
              "update": true,
              "destroy": true
            }
          }
        },
        {
          "id": "18",
          "type": "board-lists",
          "attributes": {
            "name": "Closed",
            "kind": "closed",
            "complexity": "0.0"
          },
          "relationships": {
            "issues": {
              "data": [

              ],
              "links": {
                "self": "/api/v1/board_lists/18/issues"
              }
            },
            "project": {
              "data": {
                "id": "5",
                "type": "projects"
              }
            }
          },
          "links": {
            "self": "/api/v1/board_lists/18"
          },
          "meta": {
            "permissions": {
              "update": true,
              "destroy": false
            }
          }
        },
        {
          "id": "19",
          "type": "board-lists",
          "attributes": {
            "name": "Test project 6 open",
            "kind": "open",
            "complexity": "0.0"
          },
          "relationships": {
            "issues": {
              "data": [

              ],
              "links": {
                "self": "/api/v1/board_lists/19/issues"
              }
            },
            "project": {
              "data": {
                "id": "6",
                "type": "projects"
              }
            }
          },
          "links": {
            "self": "/api/v1/board_lists/19"
          },
          "meta": {
            "permissions": {
              "update": true,
              "destroy": false
            }
          }
        },
        {
          "id": "20",
          "type": "board-lists",
          "attributes": {
            "name": "In development",
            "kind": "other",
            "complexity": "0.0"
          },
          "relationships": {
            "issues": {
              "data": [

              ],
              "links": {
                "self": "/api/v1/board_lists/20/issues"
              }
            },
            "project": {
              "data": {
                "id": "6",
                "type": "projects"
              }
            }
          },
          "links": {
            "self": "/api/v1/board_lists/20"
          },
          "meta": {
            "permissions": {
              "update": true,
              "destroy": true
            }
          }
        },
        {
          "id": "21",
          "type": "board-lists",
          "attributes": {
            "name": "Closed",
            "kind": "closed",
            "complexity": "0.0"
          },
          "relationships": {
            "issues": {
              "data": [

              ],
              "links": {
                "self": "/api/v1/board_lists/21/issues"
              }
            },
            "project": {
              "data": {
                "id": "6",
                "type": "projects"
              }
            }
          },
          "links": {
            "self": "/api/v1/board_lists/21"
          },
          "meta": {
            "permissions": {
              "update": true,
              "destroy": false
            }
          }
        },
        {
          "id": "22",
          "type": "board-lists",
          "attributes": {
            "name": "Test project 7 open",
            "kind": "open",
            "complexity": "0.0"
          },
          "relationships": {
            "issues": {
              "data": [

              ],
              "links": {
                "self": "/api/v1/board_lists/22/issues"
              }
            },
            "project": {
              "data": {
                "id": "7",
                "type": "projects"
              }
            }
          },
          "links": {
            "self": "/api/v1/board_lists/22"
          },
          "meta": {
            "permissions": {
              "update": true,
              "destroy": false
            }
          }
        },
        {
          "id": "23",
          "type": "board-lists",
          "attributes": {
            "name": "In development",
            "kind": "other",
            "complexity": "0.0"
          },
          "relationships": {
            "issues": {
              "data": [

              ],
              "links": {
                "self": "/api/v1/board_lists/23/issues"
              }
            },
            "project": {
              "data": {
                "id": "7",
                "type": "projects"
              }
            }
          },
          "links": {
            "self": "/api/v1/board_lists/23"
          },
          "meta": {
            "permissions": {
              "update": true,
              "destroy": true
            }
          }
        },
        {
          "id": "24",
          "type": "board-lists",
          "attributes": {
            "name": "Closed",
            "kind": "closed",
            "complexity": "0.0"
          },
          "relationships": {
            "issues": {
              "data": [

              ],
              "links": {
                "self": "/api/v1/board_lists/24/issues"
              }
            },
            "project": {
              "data": {
                "id": "7",
                "type": "projects"
              }
            }
          },
          "links": {
            "self": "/api/v1/board_lists/24"
          },
          "meta": {
            "permissions": {
              "update": true,
              "destroy": false
            }
          }
        },
        {
          "id": "25",
          "type": "board-lists",
          "attributes": {
            "name": "Test project 8 open",
            "kind": "open",
            "complexity": "0.0"
          },
          "relationships": {
            "issues": {
              "data": [

              ],
              "links": {
                "self": "/api/v1/board_lists/25/issues"
              }
            },
            "project": {
              "data": {
                "id": "8",
                "type": "projects"
              }
            }
          },
          "links": {
            "self": "/api/v1/board_lists/25"
          },
          "meta": {
            "permissions": {
              "update": true,
              "destroy": false
            }
          }
        },
        {
          "id": "26",
          "type": "board-lists",
          "attributes": {
            "name": "In development",
            "kind": "other",
            "complexity": "0.0"
          },
          "relationships": {
            "issues": {
              "data": [

              ],
              "links": {
                "self": "/api/v1/board_lists/26/issues"
              }
            },
            "project": {
              "data": {
                "id": "8",
                "type": "projects"
              }
            }
          },
          "links": {
            "self": "/api/v1/board_lists/26"
          },
          "meta": {
            "permissions": {
              "update": true,
              "destroy": true
            }
          }
        },
        {
          "id": "27",
          "type": "board-lists",
          "attributes": {
            "name": "Closed",
            "kind": "closed",
            "complexity": "0.0"
          },
          "relationships": {
            "issues": {
              "data": [

              ],
              "links": {
                "self": "/api/v1/board_lists/27/issues"
              }
            },
            "project": {
              "data": {
                "id": "8",
                "type": "projects"
              }
            }
          },
          "links": {
            "self": "/api/v1/board_lists/27"
          },
          "meta": {
            "permissions": {
              "update": true,
              "destroy": false
            }
          }
        },
        {
          "id": "28",
          "type": "board-lists",
          "attributes": {
            "name": "Test project 9 open",
            "kind": "open",
            "complexity": "0.0"
          },
          "relationships": {
            "issues": {
              "data": [

              ],
              "links": {
                "self": "/api/v1/board_lists/28/issues"
              }
            },
            "project": {
              "data": {
                "id": "9",
                "type": "projects"
              }
            }
          },
          "links": {
            "self": "/api/v1/board_lists/28"
          },
          "meta": {
            "permissions": {
              "update": true,
              "destroy": false
            }
          }
        },
        {
          "id": "29",
          "type": "board-lists",
          "attributes": {
            "name": "In development",
            "kind": "other",
            "complexity": "0.0"
          },
          "relationships": {
            "issues": {
              "data": [

              ],
              "links": {
                "self": "/api/v1/board_lists/29/issues"
              }
            },
            "project": {
              "data": {
                "id": "9",
                "type": "projects"
              }
            }
          },
          "links": {
            "self": "/api/v1/board_lists/29"
          },
          "meta": {
            "permissions": {
              "update": true,
              "destroy": true
            }
          }
        },
        {
          "id": "30",
          "type": "board-lists",
          "attributes": {
            "name": "Closed",
            "kind": "closed",
            "complexity": "0.0"
          },
          "relationships": {
            "issues": {
              "data": [

              ],
              "links": {
                "self": "/api/v1/board_lists/30/issues"
              }
            },
            "project": {
              "data": {
                "id": "9",
                "type": "projects"
              }
            }
          },
          "links": {
            "self": "/api/v1/board_lists/30"
          },
          "meta": {
            "permissions": {
              "update": true,
              "destroy": false
            }
          }
        },
        {
          "id": "31",
          "type": "board-lists",
          "attributes": {
            "name": "Test project 10 open",
            "kind": "open",
            "complexity": "0.0"
          },
          "relationships": {
            "issues": {
              "data": [

              ],
              "links": {
                "self": "/api/v1/board_lists/31/issues"
              }
            },
            "project": {
              "data": {
                "id": "10",
                "type": "projects"
              }
            }
          },
          "links": {
            "self": "/api/v1/board_lists/31"
          },
          "meta": {
            "permissions": {
              "update": true,
              "destroy": false
            }
          }
        },
        {
          "id": "32",
          "type": "board-lists",
          "attributes": {
            "name": "In development",
            "kind": "other",
            "complexity": "0.0"
          },
          "relationships": {
            "issues": {
              "data": [

              ],
              "links": {
                "self": "/api/v1/board_lists/32/issues"
              }
            },
            "project": {
              "data": {
                "id": "10",
                "type": "projects"
              }
            }
          },
          "links": {
            "self": "/api/v1/board_lists/32"
          },
          "meta": {
            "permissions": {
              "update": true,
              "destroy": true
            }
          }
        },
        {
          "id": "33",
          "type": "board-lists",
          "attributes": {
            "name": "Closed",
            "kind": "closed",
            "complexity": "0.0"
          },
          "relationships": {
            "issues": {
              "data": [

              ],
              "links": {
                "self": "/api/v1/board_lists/33/issues"
              }
            },
            "project": {
              "data": {
                "id": "10",
                "type": "projects"
              }
            }
          },
          "links": {
            "self": "/api/v1/board_lists/33"
          },
          "meta": {
            "permissions": {
              "update": true,
              "destroy": false
            }
          }
        }
      ],
      "links": {
        "self": "/api/v1/board_lists"
      }
    }
    """
  And the response status should be "200"

@javascript
  Scenario: Get filter[project_id]=<project_id>
  Given a test-organization with global board_list exits and is loaded
  And I set headers:
   | Authorization | Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjF9.ClWbiKD35AyiLHuBiDeCTeDwseNvX4WxFlZqdar37TU |
   | Content-Type | application/vnd.api+json |
  And I send a GET request to "/api/v1/board_lists?filter[project_id]=1"
  Then the response status should be "200"
  And the JSON response should be:
    """
      {
        "data": [
          {
            "id": "1",
            "type": "board-lists",
            "attributes": {
              "name": "Open",
              "kind": "open",
              "complexity": "12.0"
            },
            "relationships": {
              "issues": {
                "data": [
                  {
                    "id": "4",
                    "type": "issues"
                  },
                  {
                    "id": "3",
                    "type": "issues"
                  },
                  {
                    "id": "2",
                    "type": "issues"
                  },
                  {
                    "id": "1",
                    "type": "issues"
                  }
                ],
                "links": {
                  "self": "/api/v1/board_lists/1/issues"
                }
              },
              "project": {
                "data": null
              }
            },
            "links": {
              "self": "/api/v1/board_lists/1"
            },
            "meta": {
              "permissions": {
                "update": true,
                "destroy": false
              }
            }
          },
          {
            "id": "2",
            "type": "board-lists",
            "attributes": {
              "name": "In progress",
              "kind": "other",
              "complexity": "18.0"
            },
            "relationships": {
              "issues": {
                "data": [
                  {
                    "id": "7",
                    "type": "issues"
                  },
                  {
                    "id": "6",
                    "type": "issues"
                  },
                  {
                    "id": "5",
                    "type": "issues"
                  }
                ],
                "links": {
                  "self": "/api/v1/board_lists/2/issues"
                }
              },
              "project": {
                "data": null
              }
            },
            "links": {
              "self": "/api/v1/board_lists/2"
            },
            "meta": {
              "permissions": {
                "update": true,
                "destroy": false
              }
            }
          },
          {
            "id": "3",
            "type": "board-lists",
            "attributes": {
              "name": "Closed",
              "kind": "closed",
              "complexity": "17.0"
            },
            "relationships": {
              "issues": {
                "data": [
                  {
                    "id": "11",
                    "type": "issues"
                  },
                  {
                    "id": "10",
                    "type": "issues"
                  },
                  {
                    "id": "9",
                    "type": "issues"
                  },
                  {
                    "id": "8",
                    "type": "issues"
                  }
                ],
                "links": {
                  "self": "/api/v1/board_lists/3/issues"
                }
              },
              "project": {
                "data": null
              }
            },
            "links": {
              "self": "/api/v1/board_lists/3"
            },
            "meta": {
              "permissions": {
                "update": true,
                "destroy": false
              }
            }
          }
        ],
        "links": {
          "self": "/api/v1/board_lists"
        }
      }
    """
