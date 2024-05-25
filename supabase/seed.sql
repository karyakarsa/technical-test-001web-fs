-- posts data dummies
INSERT INTO posts (
    title,
    slug,
    description,
    status,
    content,
    featured_images,
    published_at,
    created_at
  )
VALUES (
    'Post 1',
    'post-1',
    'Description 1',
    'published',
    '{"time":1716351530201,"blocks":[{"id":"Y7V0YvZ1_b","type":"header","data":{"text":"A Lorem Ipsum","level":1}},{"id":"HzWvdm1GuP","type":"paragraph","data":{"text":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do <b>eiusmod</b> tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea <i><b>commodo</b></i> consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}}],"version":"2.26.5"}',
    '{"128": "https://picsum.photos/128/128", "256": "https://picsum.photos/256/256", "512": "https://picsum.photos/512/512", "1024": "https://picsum.photos/1024/1024"}',
    NOW(),
    NOW()
  ),
  (
    'Post 2',
    'post-2',
    'Description 2',
    'published',
    '{"time":1716351530201,"blocks":[{"id":"Y7V0YvZ1_b","type":"header","data":{"text":"A Lorem Ipsum","level":1}},{"id":"HzWvdm1GuP","type":"paragraph","data":{"text":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do <b>eiusmod</b> tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea <i><b>commodo</b></i> consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}}],"version":"2.26.5"}',
    '{"128": "https://picsum.photos/128/128", "256": "https://picsum.photos/256/256", "512": "https://picsum.photos/512/512", "1024": "https://picsum.photos/1024/1024"}',
    NOW(),
    NOW()
  ),
  (
    'Post 3',
    'post-3',
    'Description 3',
    'published',
    '{"time":1716351530201,"blocks":[{"id":"Y7V0YvZ1_b","type":"header","data":{"text":"A Lorem Ipsum","level":1}},{"id":"HzWvdm1GuP","type":"paragraph","data":{"text":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do <b>eiusmod</b> tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea <i><b>commodo</b></i> consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}}],"version":"2.26.5"}',
    '{"128": "https://picsum.photos/128/128", "256": "https://picsum.photos/256/256", "512": "https://picsum.photos/512/512", "1024": "https://picsum.photos/1024/1024"}',
    NOW(),
    NOW()
  ) -- protected_posts data dummies
INSERT INTO protected_posts (id, content)
VALUES (
    1,
    '{"time":1716351530201,"blocks":[{"id":"Y7V0YvZ1_b","type":"header","data":{"text":"A Lorem Ipsum","level":1}},{"id":"HzWvdm1GuP","type":"paragraph","data":{"text":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do <b>eiusmod</b> tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea <i><b>commodo</b></i> consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}}],"version":"2.26.5"}'
  ),
  (
    2,
    '{"time":1716351530201,"blocks":[{"id":"Y7V0YvZ1_b","type":"header","data":{"text":"A Lorem Ipsum","level":1}},{"id":"HzWvdm1GuP","type":"paragraph","data":{"text":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do <b>eiusmod</b> tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea <i><b>commodo</b></i> consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}}],"version":"2.26.5"}'
  ),
  (
    3,
    '{"time":1716351530201,"blocks":[{"id":"Y7V0YvZ1_b","type":"header","data":{"text":"A Lorem Ipsum","level":1}},{"id":"HzWvdm1GuP","type":"paragraph","data":{"text":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do <b>eiusmod</b> tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea <i><b>commodo</b></i> consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}}],"version":"2.26.5"}'
  );