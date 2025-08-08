import { StructureBuilder } from 'sanity/desk'
import { 
  BookIcon, 
  UserIcon, 
  TagIcon, 
  FolderIcon,
  DocumentIcon,
  EditIcon,
  UsersIcon
} from '@sanity/icons'

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      // Blog Posts
      S.listItem()
        .title('Blog Posts')
        .icon(BookIcon)
        .child(
          S.list()
            .title('Blog Posts')
            .items([
              S.listItem()
                .title('All Posts')
                .icon(DocumentIcon)
                .child(
                  S.documentList()
                    .title('All Posts')
                    .filter('_type == "post"')
                    .defaultOrdering([{field: 'publishedAt', direction: 'desc'}])
                ),
              S.listItem()
                .title('Posts by Category')
                .icon(FolderIcon)
                .child(
                  S.documentTypeList('category')
                    .title('Posts by Category')
                    .child(categoryId =>
                      S.documentList()
                        .title('Posts')
                        .filter('_type == "post" && $categoryId in categories[]._ref')
                        .params({ categoryId })
                    )
                ),
              S.listItem()
                .title('Posts by Author')
                .icon(UsersIcon)
                .child(
                  S.documentTypeList('author')
                    .title('Posts by Author')
                    .child(authorId =>
                      S.documentList()
                        .title('Posts')
                        .filter('_type == "post" && author._ref == $authorId')
                        .params({ authorId })
                    )
                ),
              S.divider(),
              S.listItem()
                .title('Draft Posts')
                .icon(EditIcon)
                .child(
                  S.documentList()
                    .title('Draft Posts')
                    .filter('_type == "post" && !defined(publishedAt)')
                ),
            ])
        ),

      S.divider(),

      // Authors
      S.listItem()
        .title('Authors')
        .icon(UserIcon)
        .child(
          S.documentTypeList('author')
            .title('Authors')
        ),

      // Categories
      S.listItem()
        .title('Categories')
        .icon(FolderIcon)
        .child(
          S.documentTypeList('category')
            .title('Categories')
        ),

      // Tags
      S.listItem()
        .title('Tags')
        .icon(TagIcon)
        .child(
          S.documentTypeList('tag')
            .title('Tags')
        ),
    ])