// JavaScript File
var DOCKER_DATA = { "biodckr": {} };

var url_repo = url('?repos');
console.log("url_repos", url_repo);
if ( url_repo) {
    var url_repos = url_repo.split(",");
    for ( var u in url_repos ) {
        var repo = url_repos[u];
        console.log("u",u,"repo",repo);
        DOCKER_DATA[repo] = {};
    }
}

console.log("DOCKER_DATA", DOCKER_DATA);

var CONTAINER   = "mainContent";

var DO_LIST_ALL = true;

var COL_NAMES = [
    ["info", 
        [
//            ["user"            , "User"            ], 
//            ["name"            , "Name"            ],
//            ["namespace"       , "Namespace"       ],
//            ["status"          , "Status"          ],
            ["description"     , "Description"     ],
//            ["is_private"      , "Is Private"      ],
            ["is_automated"    , "Is Automated"    ],
//            ["can_edit"        , "Can Edit"        ],
            ["star_count"      , "Star Count"      ],
            ["pull_count"      , "Pull Count"      ],
//            ["last_updated"    , "Last  Updated"   ],
//            ["has_starred"     , "Has Starred"     ],
//            ["full_description", "Full Description"]
        ],
    ],
    ["hist",
        [
            ["count"       , "Count"       ],
            ["build_code"  , "Build Code"  , gen_link_buildcode],
            ["created_date", "Created Date"],
            ["last_updated", "Last Updated"],
//            ["status"      , "Status"      ]
        ]
    ],
    ["logs",
        [
            ["source_url"         , "Source Url"        , gen_link_source_url],
//            ["build_path"         , "Build Path"        ],
            ["source_branch"      , "Source Branch"     ],
            ["status_description" , "Status Description"],
            ["source_type"        , "Source Type"       ],
            ["error"              , "Error"             ],
            ["failure"            , "Failure"           ],
//            ["dockerfile_contents", "Dockerfile"        , make_pre],
//            ["logs"               , "logs"              , make_pre]
        ]
    ]
];

var COL_TYPES = {};

for ( var t = 0; t < COL_NAMES.length; t++ ) {
    var type      = COL_NAMES[t];
    var type_name = type[0];
    var type_cols = type[1];

    COL_TYPES[type_name] = t;

    for ( var c = 0; c < type_cols.length; c++ ) {
        var col_data = type_cols[c];
        var col_var  = col_data[0];
        var col_name = col_data[1];
        var col_proc = col_data[2];
        
        if (!col_proc) {
            col_data[2] = function(d, v) {return v;};
        }
    }
}

var DOCKERHUB_URL = 'https://hub.docker.com/';
var GIT_URL       = 'https://github.com/';
function gen_link_buildcode (d, w) { var p = DOCKERHUB_URL + 'r/' + d.repo_full_name + '/builds/' + w + '/';                                   return '<a href="'+p+'">'+w+'</a>'; }
function gen_link_source_url(d, x) { var x = x.replace('.git', '').replace(GIT_URL,''); var p = x + '/tree/' + d.source_branch + d.build_path; return '<a href="'+GIT_URL+p+'">'+x+'</a>'; }
function make_pre           (d, y) {                                                                                                           return "<pre>"+y+"</pre>"; }

console.log("COL_TYPES", COL_TYPES);
console.log("COL_NAMES", COL_NAMES);