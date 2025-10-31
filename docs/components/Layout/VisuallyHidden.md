# 🎯 VisuallyHidden Component

The **VisuallyHidden** component hides content visually while keeping it accessible to screen readers and assistive technologies.  
It’s essential for building accessible web applications by providing non-visual context, labels, or instructions.

---

## 📦 Import

```tsx
import { VisuallyHidden } from 'kovax-react';
```

## 🚀 Quick Start

* Basic Usage
```tsx
// Hidden label for icon buttons
<button>
  <Icon name="menu" />
  <VisuallyHidden>Open navigation menu</VisuallyHidden>
</button>

// Hidden section heading
<section>
  <VisuallyHidden>
    <h2>User Dashboard Statistics</h2>
  </VisuallyHidden>
  <Chart />
  <Metrics />
</section>
```

* Skip Links
```tsx
// Skip link (visible when focused)
<VisuallyHidden showOnFocus>
  <a href="#main-content">Skip to main content</a>
</VisuallyHidden>

<header>{/* Navigation */}</header>
<main id="main-content">{/* Main content */}</main>
```

## ⚙️ Props Reference

| Prop          | Type      | Default | Description                                                           |
| ------------- | --------- | ------- | --------------------------------------------------------------------- |
| `showOnFocus` | `boolean` | `false` | Makes the hidden element visible when focused (useful for skip links) |


# Inherited Attributes
All standard HTML attributes are supported:

* id, className, style

* aria-* accessibility attributes

* data-* testing attributes

* role, lang, etc.

## 🎯 Examples

Accessibility in Interactive Elements
* Icon Buttons

```tsx
<HStack gap={2}>
  <button>
    <Icon name="search" />
    <VisuallyHidden>Search</VisuallyHidden>
  </button>

  <button>
    <Icon name="notification" />
    <VisuallyHidden>Notifications</VisuallyHidden>
    <Badge>3</Badge>
  </button>

  <button>
    <Icon name="user" />
    <VisuallyHidden>User profile</VisuallyHidden>
  </button>

  <button>
    <Icon name="settings" />
    <VisuallyHidden>Settings</VisuallyHidden>
  </button>
</HStack>
```

* Forms
```tsx
// Search input with hidden label
<form>
  <VisuallyHidden>
    <label htmlFor="search-input">Search products</label>
  </VisuallyHidden>
  <Input id="search-input" placeholder="Search products..." leftIcon={<Icon name="search" />} />
</form>

// Filter fieldset
<fieldset>
  <VisuallyHidden>
    <legend>Product filters</legend>
  </VisuallyHidden>

  <Flex gap={4}>
    <Checkbox>In stock only</Checkbox>
    <Checkbox>On sale</Checkbox>
    <Checkbox>Free shipping</Checkbox>
  </Flex>
</fieldset>
```

* Skip Links
```tsx
<VisuallyHidden showOnFocus>
  <a href="#main-navigation">Skip to navigation</a>
</VisuallyHidden>

<VisuallyHidden showOnFocus>
  <a href="#main-content">Skip to main content</a>
</VisuallyHidden>

<VisuallyHidden showOnFocus>
  <a href="#footer">Skip to footer</a>
</VisuallyHidden>
```

Custom style example:

```tsx
<VisuallyHidden showOnFocus>
  <a
    href="#main-content"
    style={{
      background: 'white',
      color: 'blue',
      padding: '8px 16px',
      borderRadius: '4px',
      fontWeight: 'bold',
      textDecoration: 'none',
    }}
  >
    Skip to main content
  </a>
</VisuallyHidden>
```

# Content Structure & Semantics
* Charts with Hidden Context
```tsx
<Box>
  <VisuallyHidden>
    <h3>Monthly Revenue Growth</h3>
    <p>Bar chart showing monthly revenue increase from January to December 2024...</p>
  </VisuallyHidden>

  <BarChart data={revenueData} />

  <VisuallyHidden>
    <p>Total annual revenue: $1,050,000</p>
  </VisuallyHidden>
</Box>
```

* Complex Components
```tsx
<Box position="relative">
  <Image src="/product.jpg" alt="Product image" />
  
  <VisuallyHidden>
    <h4>Product Image Controls</h4>
    <button onClick={zoomIn}>Zoom in</button>
    <button onClick={zoomOut}>Zoom out</button>
    <button onClick={nextImage}>Next image</button>
  </VisuallyHidden>

  <HStack position="absolute" bottom={4} right={4} gap={2}>
    <IconButton icon="zoom-in" onClick={zoomIn} />
    <IconButton icon="zoom-out" onClick={zoomOut} />
    <IconButton icon="chevron-right" onClick={nextImage} />
  </HStack>
</Box>
```

* Tables & Data Grids
```tsx
<Table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Email</th>
      <th>Registered</th>
      <th>Status</th>
      <th><VisuallyHidden>Actions</VisuallyHidden></th>
    </tr>
  </thead>
  <tbody>
    {users.map(user => (
      <tr key={user.id}>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.registered}</td>
        <td>
          <Badge color={user.active ? 'green' : 'red'}>
            {user.active ? 'Active' : 'Inactive'}
          </Badge>
        </td>
        <td>
          <HStack gap={2}>
            <IconButton icon="edit" aria-label={`Edit ${user.name}`} />
            <IconButton icon="delete" aria-label={`Delete ${user.name}`} />
          </HStack>
        </td>
      </tr>
    ))}
  </tbody>
</Table>
```

## 💡 Best Practices
# ✅ Do

* Provide meaningful hidden labels and context

* Use showOnFocus for skip links

* Keep descriptions concise and relevant

* Test with actual screen readers

# ❌ Don’t

* Hide essential visual content

* Use for decorative or redundant information

* Create overly verbose descriptions

* Forget to test keyboard navigation

# 🔍 Accessibility Guidelines

```tsx
// ✅ Good
<button>
  <Icon name="close" />
  <VisuallyHidden>Close modal dialog</VisuallyHidden>
</button>

// ✅ Skip link
<VisuallyHidden showOnFocus>
  <a href="#main">Skip to main content</a>
</VisuallyHidden>

// ❌ Avoid redundancy
<button>
  <Icon name="close" />
  <VisuallyHidden>X icon button close</VisuallyHidden>
</button>
```

# 🧪 Testing
✅ CSS clipping and visual hiding
✅ Screen reader accessibility
✅ showOnFocus visibility
✅ Attribute propagation
✅ ARIA and data-* support
✅ Complex nested content
✅ Memoization and performance

```bash
Test Suites: 1 passed, 1 total
Tests:       12 passed, 12 total
```

# 🔧 Technical Details

| Property        | Value                                 |
| --------------- | ------------------------------------- |
| Technique       | CSS clipping and absolute positioning |
| Accessibility   | WCAG 2.1 AA compliant                 |
| Performance     | Memoized, lightweight                 |
| Bundle size     | ~0.6KB gzipped                        |
| Browser Support | All modern browsers + IE11            |
| Screen Readers  | Fully supported                       |
| TypeScript      | ✅ Fully typed                        |

# CSS Implementation

```css
.visually-hidden {
  border: 0;
  clip: rect(0, 0, 0, 0);
  height: 1px;
  width: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
}
```
# 📊 Status

| Use Case                | Example                                                                 | Importance  |
| ----------------------- | ----------------------------------------------------------------------- | ----------- |
| Icon buttons            | `<Icon /><VisuallyHidden>Label</VisuallyHidden>`                        | 🔥 Critical |
| Skip links              | `<VisuallyHidden showOnFocus><a href="#main">Skip</a></VisuallyHidden>` | 🔥 Critical |
| Form context            | Hidden labels and legends                                               | ⭐ High      |
| Data visualization      | Chart context and summaries                                             | ⭐ High      |
| Interactive controls    | Hidden control labels                                                   | ✅ Medium    |
| Hidden section headings | Semantic structure                                                      | ✅ Medium    |


# 🎯 Use Cases Summary
| Use Case                | Example                                                                 | Importance  |
| ----------------------- | ----------------------------------------------------------------------- | ----------- |
| Icon buttons            | `<Icon /><VisuallyHidden>Label</VisuallyHidden>`                        | 🔥 Critical |
| Skip links              | `<VisuallyHidden showOnFocus><a href="#main">Skip</a></VisuallyHidden>` | 🔥 Critical |
| Form context            | Hidden labels and legends                                               | ⭐ High      |
| Data visualization      | Chart context and summaries                                             | ⭐ High      |
| Interactive controls    | Hidden control labels                                                   | ✅ Medium    |
| Hidden section headings | Semantic structure                                                      | ✅ Medium    |
